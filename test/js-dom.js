const { JSDOM } = require('jsdom');

const jsdom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <title>Title</title>
        </head>
      <body>
        <div id="app">Загрузка...</div>
      </body>
      </html>
    `, {
  url: 'http://localhost',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
