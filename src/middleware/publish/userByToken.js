module.exports = extension => {
  extension('/users', { 'filters[token]' : '?' }, 'token');
}
