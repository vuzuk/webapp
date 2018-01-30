export default ({ body, title }) => {
  if(process.env.NODE_ENV === "PRODUCTION") {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel='stylesheet' href='bundle.css'>
      </head>
      <body>
        <div id="root">${body}</div>
        <!-- <script src='bundle.js'></script> -->
      </body>
    </html>
  `;
  } else {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vuzuk</title>
      </head>
      <body>
        <div id="root"></div>
        <script src='bundle.js'></script>
      </body>
    </html>
  `;
  }
};