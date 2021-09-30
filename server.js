const http = require('http');
const app = require('./app');

const express = require('express');
const history = require('connect-history-api-fallback');

const apps = express();
apps.use(history());
apps.use(express.static('src'));

apps.get('/', (req, res) => {
    res.sendFile('src/index.html');
  });

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port);