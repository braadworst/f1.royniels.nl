const url  = require('url');
const fs   = require('fs');
const path = require('path');
const logger = require('minilog')('middelware:requestValidator');
require('minilog').enable();

module.exports = (request, response, next, relay) => {

  const parsedUrl = url.parse(request.url);
  let pathname    = `.${parsedUrl.pathname}`;
  const extension = path.parse(pathname).ext;

  const fileTypes = {
    '.ico'  : 'image/x-icon',
    '.html' : 'text/html',
    '.js'   : 'text/javascript',
    '.json' : 'application/json',
    '.css'  : 'text/css',
    '.png'  : 'image/png',
    '.jpg'  : 'image/jpeg',
    '.wav'  : 'audio/wav',
    '.mp3'  : 'audio/mpeg',
    '.svg'  : 'image/svg+xml',
    '.pdf'  : 'application/pdf',
    '.doc'  : 'application/msword'
  };

  // Not static
  if (!fileTypes[extension]) {
    next();
    return;
  }

  fs.exists(pathname, (exist) => {
    if(!exist) {
      response.statusCode = 404;
      response.end(`File not found: ${ request.url }`);
      return;
    }

    // if is a directory search for index file matching the extention
    if (fs.statSync(pathname).isDirectory()) pathname += '/index' + extension;

    // read file from file system
    fs.readFile(pathname, (error, data) => {
      if(error){
        response.statusCode = 500;
        response.end(`Internal server error`);
      } else {

        // Set the cache headers
        try {
          const cache = relay.settings.cache.statics;
          cache.forEach(header => {
            console.log(header.name, header.value);
            response.setHeader(header.name, header.value);
          });
        } catch (error) {
          logger.warn(`No cache headers set for static content via settings.cache.statics = [{ name : 'Cache-Control', value : 'max-age=1000'}]`);
        }

        response.setHeader('Content-type', fileTypes[extension] || 'text/plain' );
        response.end(data);
      }
    });
  });
}
