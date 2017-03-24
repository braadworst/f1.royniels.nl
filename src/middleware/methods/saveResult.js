const url    = require('url');
const errors = require('./errors');
const crypto = require('crypto');
const logger = require('minilog')('middleware:saveData');
require('minilog').enable();

module.exports = async function(request, response, next, relay) {

  if (!relay.body) {
    const message = 'There is no record found that we can add';
    logger.warn(message);
    next({ errors : message });
    return;
  }

  const query = url.parse(request.url).query;

  if (!query) {
    const message = 'Invalid request, please provide proper token';
    logger.warn(message);
    next({ errors : message });
    return;
  }

  const encryptedToken = query
    .split('&')
    .map(section => section.split('='))
    .filter(section => section[0] === 'token')
    .pop()
    .pop();

  if (!encryptedToken) {
    const message = 'Invalid request, please provide proper token';
    logger.warn(message);
    next({ errors : message });
    return;
  }

  const passphrase = relay.settings.encryption.passphrase;
  const mode       = relay.settings.encryption.mode;
  const decipher = crypto.createDecipher(mode, passphrase);
  let   token    = decipher.update(encryptedToken,'hex','utf-8')
  token         += decipher.final('utf-8');

  try {
    const user = await relay.database.find(require('../schemas/users'), { filters : [{ field : 'token', value : token}] });
    if (!user || !user.pop().isAdmin) {
      const message = 'You are not authorized to save results';
      logger.warn(message);
      next({ errors : message });
      return;
    }
  } catch (error) {
    logger.error(error);
    errors.internalServerError(request, response, error.message);
    return;
  }

  try {
    const post     = relay.body;
    const database = relay.database;
    const schema   = require('../schemas/' + relay.type);
    let result;

    if (post.id) {
      result = await database.update(schema, post);
    } else {
      result = await database.insert(schema, post);
    }

    const teams         = await database.find(require('../schemas/teams'));
    const predictions   = await database.find(require('../schemas/predictions'), { fitlers : [{ field : 'circuitId', value : result.circuitId }]});
    const drivers       = await database.find(require('../schemas/drivers'));
    const awardedPoints = relay.settings.points;
    let records         = [];

    // Replace all the driver ids in the result with the driver object,
    // so we can match chassis and engine when we want to calculate that
    let positions = {};
    Object.keys(result).map(key => {
      if (key !== 'circuitId' && key !== 'id' && key !== 'best' && key !== 'fastest') {
        positions[key] = drivers.filter(driver => driver.id === result[key]).pop();
      }
    });

    for (const team of teams) {
      let points = 0, position;
      const teamId         = team.id;
      const userId         = team.userId;
      const firstDriverId  = team.firstDriverId;
      const secondDriverId = team.secondDriverId;
      const chassisId      = team.chassisId;
      const engineId       = team.engineId;
      const prediction     = predictions.filter(prediction => prediction.userId === userId).pop();

      // Add points if fastest driver is correct
      if (prediction && prediction.fastestDriverId === result.fastest) {
        points = points + awardedPoints.fastest;
      }

      // Add points if best driver is corrent
      if (prediction && prediction.bestDriverId === result.best) {
        points = points + awardedPoints.best;
      }

      // Give points to first driver based on his position
      position = Object.keys(positions).filter(key => positions[key].id === firstDriverId).pop();
      if (position) {
        points = points + awardedPoints[position];
      }

      // Give points to second driver based on his position
      position = Object.keys(positions).filter(key => positions[key].id === secondDriverId).pop();
      if (position) {
        points = points + awardedPoints[position];
      }

      // Add points based on chassis
      position = Object.keys(positions).filter(key => positions[key].chassisId === chassisId);
      position.forEach(row => {
        points = points + awardedPoints[row];
      });

      // Add points based on chassis
      position = Object.keys(positions).filter(key => positions[key].engineId === engineId);
      position.forEach(row => {
        points = points + awardedPoints[row];
      });

      records.push({ teamId, circuitId : result.circuitId, points });
    }

    // Sort the array so we can add the rank
    records = records
      .sort((a, b) => b.points - a.points)
      .map((record, index) => {
        record.rank = index + 1;
        return record;
      });

    for (const record of records) {
      const standingsSchema = require('../schemas/standings');
      let match = await database.find(standingsSchema, {
        filters : [{
          field : 'teamId',
          value : record.teamId
        }, {
          field : 'circuitId',
          value : record.circuitId
        }]
      });

      if (Array.isArray(match) && match.length > 0) {
        record.id = match.pop().id;
        await database.update(standingsSchema, record);
      } else {
        await database.insert(standingsSchema, record);
      }
    }

    next({ data : result });
  } catch (error) {
    logger.error(error);
    errors.internalServerError(request, response, error.message);
  }
}
