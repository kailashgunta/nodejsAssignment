const { Sequelize } = require('sequelize');

// SQLite connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './expense-tracker.sqlite'
});

sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch((error) => console.error('Unable to sync database:', error));

module.exports = sequelize;
