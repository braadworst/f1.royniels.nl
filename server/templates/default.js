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
      <section id="nav"></section>
      <main>
        <section id="teamCreate"></section>
        <section id="races"></section>
        <section id="rules"></section>
        <section id="standings"></section>
        <section id="teams"></section>
      </main>
      <script class="state"></script>
    </body>
  </html>
  `
}());
