import serialize from 'serialize-javascript';
export function staticHTML ({ title, data, customData, meta }) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${meta !== undefined ? `<meta property="title" content="${meta.title}">
      <meta property="description" content="${meta.description}">
      <meta property="keywords" content="${meta.keywords}">`: `<null>`}
      <meta property="og:title" content=" ">
      <meta property="og:description" content=" ">
      <meta property="og:sitename" content=" ">
      <meta itemprop="title" content=" ">
      <meta itemprop="description" content=" ">
      <!-- Global site tag - Google Analytics -->
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
      <!-- Facebook Pixel Code -->
      <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '241928490081325');
        fbq('track', 'PageView');
      </script>
      <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=241928490081325&ev=PageView&noscript=1"
      /></noscript>
      <!-- End Facebook Pixel Code -->
    </head>
    <body>
`;
};

export function dynamicHTML ({body}) {
  return `
  <div id="root">${body}</div>
      <script src='/vendor.b40e594b78a5697e771d.js'></script>
      <script src='/bundle.js'></script>
      <script type='text/javascript' src='http://platform-api.sharethis.com/js/sharethis.js#property=5abf669cce89f00013641dd1&product=inline-share-buttons' async='async'></script>
    </body>
  </html>
  `;
}