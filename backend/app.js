
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
  .use(candidateRoutes)
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
