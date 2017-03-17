module.exports = (request, response, next) => {
  let body = '';
  request.on('data', data => body += data);
  request.on('end', () => {
    if (body) {
      next({ body : JSON.parse(body) });
    } else {
      next({ body : {} });
    }
  })
}
