
const { gender } = require('./enums');
const punctuation = require('../candidates/punctuation.json');

const heightScore = (examName, candidateGender, testArray) => {
  let examObject;
  let candidateScore = false;
  const genderSpecific = gender[candidateGender];
  const minimunHeight = punctuation[genderSpecific][examName];

  if (testArray.length == 2) {
    examObject = testArray.filter((exam) => exam.retest === true)[0];
  } else {
    examObject = testArray[0];
  }

  const { result, retest } = examObject;
  candidateScore = (result < minimunHeight) ? false : true;

  return {
    result,
    retest,
    candidateScore,
  };
};

module.exports = heightScore;
