const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');
const Event = require('./Event');
const User = require('./User');

const EventRegistration = sequelize.define('EventRegistration', {
  status: { type: DataTypes.ENUM('registered', 'cancelled'), defaultValue: 'registered' },
});

EventRegistration.belongsTo(User, { foreignKey: 'user_id' });
EventRegistration.belongsTo(Event, { foreignKey: 'event_id' });

module.exports = EventRegistration;