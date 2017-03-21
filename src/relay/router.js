module.exports = router => {
  return function (request, response, next) => {
    next({ router });
  }
}
