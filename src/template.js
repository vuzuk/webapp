export default ({ body, title }) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="/froala_editor.pkgd.min.css">
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
      <link rel='stylesheet' href='/bundle.css'>
      <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">
      <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      <link rel="stylesheet" href="/froala_style.min.css">
      <link rel="stylesheet" href="/video.min.css">
      <link rel="stylesheet" href="/emoticons.min.css">
    </head>
    <body>
      <div id="root">${body}</div>
      <script src='/vendor.js'></script>
      <script src='/bundle.js'></script>
      <script type='text/javascript' src='http://platform-api.sharethis.com/js/sharethis.js#property=5abf669cce89f00013641dd1&product=inline-share-buttons' async='async'></script>
    </body>
  </html>
`;
};