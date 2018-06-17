
const models = require('../models');

class Exams {
  static addExam(classNumber, examDate, number, candidateExam) {
    return new Promise((resolve, reject) => {
      models.Candidates.find({
        where: {
          classNumber,
          examDate,
          number,
        }
      })
        .then((candidate) => {
          if (candidate !== null) {
            const exams = candidate.exams || [];

            candidate.exams = exams;
            candidate.exams.push(candidateExam);

            candidate.save()
              .then(resolve)
              .catch(reject);
          } else {
            reject('Candidate does not exist');
          }
        })
        .catch(reject);
    });
  }
}

module.exports = Exams;