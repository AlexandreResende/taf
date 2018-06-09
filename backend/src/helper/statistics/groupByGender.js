
const groupByGender = (candidatesArray) => {
  const total = candidatesArray.length;
  const men = candidatesArray.filter((candidate) => candidate.gender === 'Masculino').length;
  const women = total - men;

  return {
    men,
    women,
    total
  };
};

module.exports = groupByGender;
