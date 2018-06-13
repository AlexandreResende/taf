
const express = require('express');
const router = express.Router();

const { getCandidates, addCandidate, getCandidate, score } = require('./candidates-controller');

router.get('/candidate/:day/:month/:year/:classNumber/:number', getCandidate);

router.get('/candidates/:day/:month/:year/:classNumber', getCandidates);

router.get('/score/:day/:month/:year/:classNumber', score);

router.post('/candidates', addCandidate);

module.exports = router;
