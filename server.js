const express = require('express');

const logger = require('./middleware/dateLogger-middleware.js');

const userRouter = require('./users/userRouter.js');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware


module.exports = server;
