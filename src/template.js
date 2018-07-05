import serialize from 'serialize-javascript';
export function staticHTML ({ title, data, customData }) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-120432266-1"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-120432266-1');
      </script>
      <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
      <script>window.__CUSTOM_DATA__ = ${serialize(customData)}</script>
      <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
      <link rel='stylesheet' href='/bundle.css'>
      <link rel="stylesheet" href="/froala_editor.pkgd.min.css">
      <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      <link rel="stylesheet" href="/froala_style.min.css">
      <link rel="stylesheet" href="/video.min.css">
    </head>
    <body>
`;
};

export function dynamicHTML ({body}) {
  return `
  <div id="root">${body}</div>
      <script src='/vendor.7e62145e3d1afb83ad09.js'></script>
      <script src='/bundle.js'></script>
      <script type='text/javascript' src='http://platform-api.sharethis.com/js/sharethis.js#property=5abf669cce89f00013641dd1&product=inline-share-buttons' async='async'></script>
    </body>
  </html>
  `;
}