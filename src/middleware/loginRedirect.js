module.exports = (request, reponse, next, relay) => {
  if (relay.user) {
    relay.router.redirect(relay.settings.paths.standings);
    return;
  }
  next();
}
