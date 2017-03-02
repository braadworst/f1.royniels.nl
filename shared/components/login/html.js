module.exports = function(options = {}) {
  return `
  <component-login>
    <div class="brand">
      <span class="logo first"></span><span class="logo second"></span><span class="logo third"></span><span class="logo fourth"></span>
      <span class="name">F1 Manager</span>
    </div>
    <p>Login with one of the following networks</p>
    <ul>
      <li><a href=""><i class="fa fa-google" aria-hidden="true"></i>Google</a></li>
      <li><a href=""><i class="fa fa-facebook-official" aria-hidden="true"></i>Facebook</a></li>
      <li><a href=""><i class="fa fa-github" aria-hidden="true"></i>Github</a></li>
      <li><a href=""><i class="fa fa-reddit" aria-hidden="true"></i>Reddit</a></li>
      <li><a href=""><i class="fa fa-twitter" aria-hidden="true"></i>Twitter</a></li>
      <li><a href=""><i class="fa fa-linkedin" aria-hidden="true"></i>LinkedIn</a></li>
    </ul>
  </component-login>
  `;
}
