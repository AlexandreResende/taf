
const queryString = require('querystring');

const Candidates = require('./candidates-model');

module.exports.getCandidate = (req, res) => {
  const { day, month, year, classNumber, number } = req.params;
  const getCandidatesResult = Candidates.getCandidate(`${day}/${month}/${year}`, classNumber, number);

  Promise.all([getCandidatesResult])
    .then((candidate) => {
      res.status(200).send({
        result: candidate[0],
        error: null,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        result: null,
        error: err,
      });
    });
};

module.exports.getCandidates = (req, res) => {
  const { day, month, year, classNumber } = req.params;
  const getCandidatesResult = Candidates.getCandidates(`${day}/${month}/${year}`, classNumber);

  Promise.all([getCandidatesResult])
    .then((candidates) => {
      res.status(200).send({
        result: candidates[0],
        error: null,
      });
    })
    .catch((err) => {
      res.status(400).send({
        result: null,
        error: err,
      });
    });
};

module.exports.score = (req, res) => {
  const { day, month, year, classNumber } = req.params;
  const candidatesScore = Candidates.score(`${day}/${month}/${year}`, classNumber);

  Promise
    .all([candidatesScore])
    .then((candidatesScore) => {
      res.status(200).send({
        result: candidatesScore[0],
        error: null,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        result: null,
        error: err,
      });
    });
};

module.exports.addCandidate = (req, res) => {
  const addCandidateResult = Candidates.addCandidate(req.body);

  Promise.all([addCandidateResult])
    .then((candidate) => {
      res.status(200).send({
        result: candidate,
        error: null,
      });
    })
    .catch((err) => {
      res.status(400).send({
        result: null,
        error: err,
      });
    });
};
