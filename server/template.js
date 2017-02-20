module.exports = (function() {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title></title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="">
      <meta name="author" content="Roy Niels">

      <link rel="stylesheet" href="/public/css/styles.css">

      <script src="/public/js/main.min.js"></script> 

    </head>
    <body>
      <component-nav></component-nav>
      <main>
        <component-page-switcher></component-page-switcher>
      </main>
      <script class="state"></script>
    </body>
  </html>
  `
}());
