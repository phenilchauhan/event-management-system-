const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Event extends Model {}

Event.init({
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  date: DataTypes.DATEONLY,
  category: DataTypes.STRING,
  location_id: DataTypes.INTEGER,
  created_by: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Event'
});

module.exports = Event;
