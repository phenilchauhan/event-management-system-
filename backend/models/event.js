const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');
const User = require('./User');
const Location = require('./Location');

const Event = sequelize.define('Event', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  date: DataTypes.DATEONLY,
  category: DataTypes.STRING,
});

Event.belongsTo(Location, { foreignKey: 'location_id' });
Event.belongsTo(User, { foreignKey: 'created_by' });

module.exports = Event;