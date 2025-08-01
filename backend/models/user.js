const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password_hash: DataTypes.STRING,
  role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
});

module.exports = User;