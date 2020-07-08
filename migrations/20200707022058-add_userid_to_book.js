'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'UserId', {type: Sequelize.INTEGER})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Books", "UserId");
  }
};
