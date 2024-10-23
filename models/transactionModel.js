const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Category = require('./categoryModel');

const Transaction = sequelize.define('Transaction', {
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Associations
Transaction.belongsTo(Category);
Category.hasMany(Transaction);

module.exports = Transaction;
