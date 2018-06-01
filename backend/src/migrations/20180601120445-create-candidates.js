'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Candidates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING
      },
      examDate: {
        type: Sequelize.STRING
      },
      exams: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.JSONB)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Candidates');
  }
};