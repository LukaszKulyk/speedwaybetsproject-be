const http = require('http');
const app = require('./app');

const express = require('express');

const apps = express();

apps.get('/', (req, res) => {
    res.sendFile('src/index.html');
  });

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);