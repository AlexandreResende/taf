
const { gender } = require('./enums');
const punctuation = require('../candidates/punctuation.json');

const runningScore = (examName, candidateGender, testArray) => {
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
  console.log();
  console.log(scoreTableKeys);
  for (let counter = scoreTableKeys.length - 1; counter >= 0; counter--) {
    console.log();
    console.log(candidateResult);
    console.log(scoreTableKeys[counter]);
    if (candidateResult >= scoreTableKeys[counter]) {
      return scoreTable[scoreTableKeys[counter]];
    }
  }

  return minScore;
};

module.exports = runningScore;
