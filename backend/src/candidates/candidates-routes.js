
const express = require('express');
const router = express.Router();

const { getCandidates, addCandidate, getCandidate } = require('./candidates-controller');

router.get('/candidate/:day/:month/:year/:number', getCandidate);

router.get('/candidates/:day/:month/:year', getCandidates);

router.post('/candidates', addCandidate);

module.exports = router;