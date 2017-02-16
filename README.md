# About

This is the basis for building custom SPA (Single page apps) without any framework (ie. Angular, React, Riot, Ember, etc)
It is build purly on ES6 js, HTML and CSS. It has NPM packages installed that take care of tasks that need to be done and thats it.

You can use it as you see fit, no need to following this (directory) structure or any of the modules that I have in this setup. Wanna change the router, go for it, wanna change the rendering templating engine, be my guest. You get the gist, modular and not relaying on any monolithic framework.

It featured the following stuff:

- Initial page is serverside loaded, good for SEO
- Single page behaviour afterwards
- Router that shares routes between client and server
- HTML/Components that is shared between client and server
- Uses redux to make sure state is handles in a scalable manner
- Uses babel and browserify to make it all modern
- I use plain css, but plug in whatever you feel like (all modular, gets minified)
- HTTP2 with express
- Compression (gzip)
- No dependencies on any build tool, just package.json with some script tags
- Automatic certs generation for development
