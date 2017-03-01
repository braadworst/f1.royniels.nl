const url  = require('url');
const fs   = require('fs');
const path = require('path');

module.exports = function(request, response) {
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
    return false;
  }

  fs.exists(pathname, (exist) => {
    if(!exist) {
      response.statusCode = 404;
      response.end(`File not found: ${ request.url }`);
    }

    // if is a directory search for index file matching the extention
    if (fs.statSync(pathname).isDirectory()) pathname += '/index' + extension;

    // read file from file system
    fs.readFile(pathname, (error, data) => {
      if(error){
        response.statusCode = 500;
        response.end(`Internal server error`);
      } else {
        response.setHeader('Content-type', fileTypes[extension] || 'text/plain' );
        response.end(data);
      }
    });
  });
}
