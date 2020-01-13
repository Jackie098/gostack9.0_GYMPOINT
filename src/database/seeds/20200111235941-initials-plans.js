module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('plans', [
      {
        title: 'Start',
        duration: 1,
        price: 129.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Gold',
        duration: 3,
        price: 109.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Diamond',
        duration: 6,
        price: 89.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Plus',
        duration: 12,
        price: 79.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Standard',
        duration: 2,
        price: 119.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: () => {},
};
