require('babel-polyfill');

document.addEventListener("DOMContentLoaded", function(event) {

  // Set the environment
  let apiDomain = 'https://api.royniels.nl';
  if (window.location.hostname === 'localhost') {
    apiDomain = 'http://localhost:4444';
  }

  // const router       = require('cs-router')();
  const api          = require('../api')(apiDomain);
  const renderer     = require('../renderer/client')();

  // Load server side cache
  api.setCache(window.__apiCache__);

  // Setup the components
  const registered = require('../components/register');
  const components = require('../components')(registered, api, renderer);

  // Initial ready call for all components on the page
  renderer.init();

  // TODO implement client side routing, when we have added subscriptions and publish
  // router
  //   .before((request, response, next) => next({ components }))
  //
  // require('./shared')(router);
});
