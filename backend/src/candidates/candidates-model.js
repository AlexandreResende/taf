
const models = require('../models');

class Candidates {
  static getCandidates(examDate) {
    console.log(examDate);
    return new Promise((resolve, reject) => {
      models.Candidates.findAll({
        where: {
          examDate,
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  static addCandidate(candidate) {
    return new Promise((resolve, reject) => {
      models.Candidates.create(candidate)
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = Candidates;
