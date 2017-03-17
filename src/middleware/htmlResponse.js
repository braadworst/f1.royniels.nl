module.exports = (request, response, next, relay) => {
  relay.renderer.cache(relay.api.getCache());
  const html = relay.renderer.html();
  response.end(html);
}
