'use strict';
module.exports = function(sequelize, DataTypes) {
  var Candidates = sequelize.define('Candidates', {
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    number: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    examDate: DataTypes.STRING,
    exams: DataTypes.ARRAY(DataTypes.JSONB)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Candidates;
};