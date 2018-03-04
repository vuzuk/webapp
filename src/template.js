export const index = ({ body, title }) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Source+Code+Pro:500" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        <link rel='stylesheet' href='bundle.css'>
      </head>
      <body style="overflow-y: hidden">
        <div id="root">${body}</div>
        <script src='bundle.js'></script>
      </body>
    </html>
  `;
};

export default ({ body, title }) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Source+Code+Pro:500" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
      <link rel='stylesheet' href='bundle.css'>
      <link rel="stylesheet" href="froala_style.min.css">
      <link rel="stylesheet" href="froala_editor.pkgd.min.css">
    </head>
    <body>
      <div id="root">${body}</div>
      <script src='bundle.js'></script>
    </body>
  </html>
`;
};