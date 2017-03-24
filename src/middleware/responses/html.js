module.exports = (request, response, next, relay) => {
  relay.renderer.cache(relay.api.getCache());
  const html = relay.renderer.html();
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.end(html);
}
