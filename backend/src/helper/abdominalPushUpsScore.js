
const { gender } = require('./enums');

const pushUpsScore = (examName, candidateGender, testArray) => {
  let examObject;
  let candidateResult;
  const genderSpecific = gender[candidateGender];
  const scoreTable = exams[genderSpecific][examName];
  const scoreTableKeys = Object.keys(scoreTable);

  if (testArray.length == 2) {
    examObject = testArray.filter((exam) => exam.retest === true)[0];
  } else {
    examObject = testArray[0];
  }

  candidateResult = examObject.result;

  if (candidateResult < scoreTableKeys[0]) {
    return 0;
  } else if (candidateResult > scoreTableKeys[scoreTableKeys.length - 1]) {
    return 100;
  }

  return scoreTableKeys[candidateResult];
};

module.exports = pushUpsScore;
