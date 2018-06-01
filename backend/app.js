
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

const candidateRoutes = require('./src/candidates/candidates-routes');

app
  .use(helmet())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .use(candidateRoutes)
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
