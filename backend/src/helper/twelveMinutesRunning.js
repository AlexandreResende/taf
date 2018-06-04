
const { gender } = require('./enums');
const punctuation = require('../candidates/punctuation.json');

const twelveMinutesRunning = (examName, candidateGender, testArray) => {
  let examObject;
  let candidateResult;
  const minScore = 0;
  const genderSpecific = gender[candidateGender];
  const scoreTable = punctuation[genderSpecific][examName];
  const scoreTableKeys = Object.keys(scoreTable);

  if (testArray.length == 2) {
    examObject = testArray.filter((exam) => exam.retest === true)[0];
  } else {
    examObject = testArray[0];
  }

  candidateResult = examObject.result;

  for (let counter = scoreTableKeys.length - 1; counter >= 0; counter--) {
    if (candidateResult >= scoreTableKeys[counter]) {
      return scoreTable[scoreTableKeys[counter]];
    }
  }

  return minScore;
};

module.exports = twelveMinutesRunning;
