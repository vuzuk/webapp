export default ({ body, title }) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        <link rel='stylesheet' href='bundle.css'>
      </head>
      <body>
        <div id="root">${body}</div>
        <script src='bundle.js'></script>
      </body>
    </html>
  `;
};