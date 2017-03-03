module.exports = function(options = {}) {
  return `
  <component-login>
    <div class="brand">
      <span class="logo first"></span><span class="logo second"></span><span class="logo third"></span><span class="logo fourth"></span>
      <span class="name">F1 Manager</span>
    </div>
    <p>Login with one of the following networks</p>
    <ul>
      <li data-method="auth/google"><i class="fa fa-google" aria-hidden="true"></i>Google</li>
      <li data-method="auth/facebook"><i class="fa fa-facebook-official" aria-hidden="true"></i>Facebook</li>
      <li data-method="auth/github"><i class="fa fa-github" aria-hidden="true"></i>Github</li>
      <li data-method="auth/reddit"><i class="fa fa-reddit" aria-hidden="true"></i>Reddit</li>
      <li data-method="auth/twitter"><i class="fa fa-twitter" aria-hidden="true"></i>Twitter</li>
      <li data-method="auth/linkedin"><i class="fa fa-linkedin" aria-hidden="true"></i>LinkedIn</li>
    </ul>
  </component-login>
  `;
}
