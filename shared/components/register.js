module.exports = (function() {
  return [
    { name : 'nav', code : require('./nav') },
    { name : 'teamCreate', code : require('./teamCreate') },
    { name : 'rules', code : require('./rules') },
    { name : 'standings', code : require('./standings') },
    { name : 'teams', code : require('./teams') },
    { name : 'races', code : require('./races') },
    { name : 'login', code : require('./login') },
    { name : 'switcher', code : require('./switcher') },
  ];
}());
