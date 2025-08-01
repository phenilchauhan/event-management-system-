const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');

const Location = sequelize.define('Location', {
  name: DataTypes.STRING,
  address: DataTypes.TEXT,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  country: DataTypes.STRING,
});

module.exports = Location;