
const candidatesStatistics = (candidatesArray, examName) => {
  const total = candidatesArray.length;
  const approved = candidatesArray
    .filter((candidate) => {return candidate.punctuation[examName].candidateScore >= 60}).length;
  const reproved = total - approved;
  const average = candidatesArray.reduce((acc, candidate) => acc + candidate.punctuation[examName].result, 0);

  return {
    approved,
    reproved,
    total,
    average,
  };
};

module.exports = candidatesStatistics;
