
const express = require('express');
const router = express.Router();

const { addCandidates } = require('./candidates-controller');

router.get('/candidates', getCandidates);

router.post('/candidates', addCandidates);

module.exports = router;