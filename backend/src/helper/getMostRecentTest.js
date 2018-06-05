
const getMostRecentTest = (testArray) => {
  if (testArray.length == 2) {
    return testArray.filter((exam) => exam.retest === true)[0];
  }
  return testArray[0];
};

module.exports = getMostRecentTest;