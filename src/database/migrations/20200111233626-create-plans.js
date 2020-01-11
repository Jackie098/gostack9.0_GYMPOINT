module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plans', { id: Sequelize.INTEGER });
  },

  down: queryInterface => {
    return queryInterface.dropTable('plans');
  },
};
