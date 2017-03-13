src
  - routing
    - server
    - api
    - index
    - url
  - components
    - nav
    - login
    - races
    - results
    - rules
    - standings
    - teamCreate
    - teams
    - index.js
    - register
  - css
  - templates
  - renderer
    - server
    - client
  - middleware
  - schemas
  - fixtures
  - store
  - settings
  - api
  - bootstrap

component
  subscribe
  prepare
  templates
    loaded
    failed
    loading
  placeholder
  events


component
  template(name, template, placeholder)
  subscribe(name)
  create(name, placeholder)
  remove([name])

renderer
  unsubscribe(placeholder)
  subsribe(placeholder)
  add(name, template, placeholder)
  ready(name)
  removed(name)

api
  initial
  done
  get
  set

component = function() {
  let components = {}
  let dataSubscriptions = {},
  let callbacks = {
    dataSubscribe,
    dataChanged,
    domAdded,
    domRemoved,
    domAdd,
    domRemove,
  }

  return {
    register(components)
    create(name, placeholder),
    remove(name = false),
    dataSubscribe(callback),
    dataChanged(callback),
    domReady(callback)
    domRemoved(callback),
    domAdd(callback),
    domRemove(callback)
  }
}
