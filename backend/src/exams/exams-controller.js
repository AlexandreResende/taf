
const Exams = require('./exams-model');

module.exports.addExams = (req, res) => {
  let examDate, number, rest;
  ({ examDate, number, ...rest } = req.body);
  const examsEditResult = Exams.addExam(examDate, number, rest);

  Promise
    .all([examsEditResult])
    .then((result) => {
      res.status(200).send({
        result,
        error: null,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send({
        result: null,
        error: err,
      });
    });
};