
const { gender } = require('./enums');
const punctuation = require('../candidates/punctuation.json');

const twelveMinutesRunning = (examName, candidateGender, testArray) => {
  let candidateScore = 0;
  const examObject = testArray[0];
  const genderSpecific = gender[candidateGender];
  const scoreTable = punctuation[genderSpecific][examName];
  const scoreTableKeys = Object.keys(scoreTable);
  const { result, retest } = examObject;

  for (let counter = scoreTableKeys.length - 1; counter >= 0; counter--) {
    if (result >= scoreTableKeys[counter]) {
      candidateScore = scoreTable[scoreTableKeys[counter]];
      break;
    }
  }

  return {
    result,
    retest,
    candidateScore,
  };
};

module.exports = twelveMinutesRunning;
