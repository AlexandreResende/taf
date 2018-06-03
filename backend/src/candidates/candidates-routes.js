
const express = require('express');
const router = express.Router();

const { getCandidates, addCandidate, getCandidate, score } = require('./candidates-controller');

router.get('/candidate/:day/:month/:year/:number', getCandidate);

router.get('/candidates/:day/:month/:year', getCandidates);

router.get('/score/:day/:month/:year', score);

router.post('/candidates', addCandidate);

module.exports = router;