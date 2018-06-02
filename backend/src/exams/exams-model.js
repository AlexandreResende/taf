
const models = require('../models');

class Exams {
  static addExam(examDate, number, candidateExam) {
    return new Promise((resolve, reject) => {
      models.Candidates.find({
        where: {
          examDate,
          number,
        }
      })
        .then((candidate) => {
          const exams = candidate.exams || [];

          candidate.exams = exams;
          candidate.exams.push(candidateExam);

          candidate.save()
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }
}

module.exports = Exams;