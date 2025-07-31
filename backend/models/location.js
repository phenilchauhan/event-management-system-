// models/Location.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Location extends Model {}

Location.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Location',
  tableName: 'locations',  // optional, ensures correct table name
  timestamps: true         // optional, default true
});

module.exports = Location;
