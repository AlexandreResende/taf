
const express = require('express');
const router = express.Router();

const { getCandidates, addCandidate } = require('./candidates-controller');

router.get('/candidates/:day/:month/:year', getCandidates);

router.post('/candidates', addCandidate);

module.exports = router;