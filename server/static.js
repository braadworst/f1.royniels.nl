const url  = require('url');
const fs   = require('fs');
const path = require('path');

module.exports = function(server) {
  server.on('request', (request, response) => {

    const parsedUrl = url.parse(request.url);
    let pathname = `.${parsedUrl.pathname}`;
    const ext = path.parse(pathname).ext;

    const map = {
      '.ico': 'image/x-icon',
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.json': 'application/json',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.wav': 'audio/wav',
      '.mp3': 'audio/mpeg',
      '.svg': 'image/svg+xml',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword'
    };

    fs.exists(pathname, function (exist) {
      if(!exist) {
        // if the file is not found, return 404
        response.statusCode = 404;
        response.end(`File ${pathname} not found!`);
        return;
      }

      // if is a directory search for index file matching the extention
      if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;

      // read file from file system
      fs.readFile(pathname, function(err, data){
        if(err){
          response.statusCode = 500;
          response.end(`Error getting the file: ${err}.`);
        } else {
          // if the file is found, set Content-type and send data
          response.setHeader('Content-type', map[ext] || 'text/plain' );
          response.end(data);
        }
      });
    });
  });
}
