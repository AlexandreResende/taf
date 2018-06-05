
const { gender } = require('./enums');
const punctuation = require('../candidates/punctuation.json');

const pushUpsScore = (examName, candidateGender, testArray) => {
  let examObject;
  let candidateScore = 0;
  const genderSpecific = gender[candidateGender];
  const scoreTable = punctuation[genderSpecific][examName];
  const scoreTableKeys = Object.keys(scoreTable);

  if (testArray.length == 2) {
    examObject = testArray.filter((exam) => exam.retest === true)[0];
  } else {
    examObject = testArray[0];
  }
  const { result, retest } = examObject;

  if (result < scoreTableKeys[0]) {
    candidateScore = 0;
  } else if (result > scoreTableKeys[scoreTableKeys.length - 1]) {
    candidateScore = 100;
  } else {
    candidateScore = scoreTableKeys[result];
  }

  return {
    result,
    retest,
    candidateScore,
  };
};

module.exports = pushUpsScore;
