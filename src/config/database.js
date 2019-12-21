module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '1234',
  port: 5433,
  database: 'gympoint',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
