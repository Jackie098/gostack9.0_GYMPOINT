module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('plans', [{}]);
  },

  down: () => {},
};
