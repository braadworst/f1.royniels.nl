module.exports = (request, response, next, relay) => {
  // relay.renderer.state(relay.state.preloaded());
  const html = relay.renderer.html();
  response.end(html);
}
