export default ({ body, title }) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel='stylesheet' href='bundle.css'>
      </head>
      <body>
        <div id="root">${body}</div>
        ${process.env.NODE_ENV === "PRODUCTION" ? "" : "<script src='bundle.js'></script>"}
      </body>
    </html>
  `;
};