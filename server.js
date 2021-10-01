const http = require('http');
const app = require('./app');
//const fs = require('fs')

const express = require('express');
const history = require('connect-history-api-fallback');

const apps = express();

const staticFileMiddleware = express.static('src');

app.use(staticFileMiddleware);

app.use(history({
  index: '/index.html'
}));

app.use(staticFileMiddleware);
//apps.use(history());
//apps.use(express.static('src'));

apps.get('/', (req, res) => {
    res.sendFile('src/index.html');
  });

const port = process.env.PORT || 3000;

const server = http.createServer(app);

app.all("*", (_req, res) => {
  try {
    res.sendFile('src/index.html');
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

server.listen(port);

/*
http.createServer((req, res) => {
  fs.readFile('src/index.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.html" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(port, () => {
  console.log('Server listening on: http://localhost:%s', port)
})*/