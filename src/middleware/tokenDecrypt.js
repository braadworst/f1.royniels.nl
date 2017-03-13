
module.exports = (request, response, next, relay) => {
  if (request.headers.cookie && request.headers.cookie.token) {
    const decipher = crypto.createDecipher('aes-256-ctr', passphrase);
    let   token    = decipher.update(text,'hex','utf-8')
    token         += decipher.final('utf-8');
    next({ token });
  } else {
    next({ token : false })
  }
}
