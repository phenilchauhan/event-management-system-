// backend/models/index.js
const sequelize = require('../config/db');

const User = require('./User');
const Event = require('./Event');
const Location = require('./Location');
const Registration = require('./Registration');

// 🔗 Define associations
User.hasMany(Event, { foreignKey: 'created_by' });
Event.belongsTo(User, { foreignKey: 'created_by' });

Location.hasMany(Event, { foreignKey: 'location_id' });
Event.belongsTo(Location, { foreignKey: 'location_id' });

User.belongsToMany(Event, { through: Registration, foreignKey: 'user_id' });
Event.belongsToMany(User, { through: Registration, foreignKey: 'event_id' });

// ✅ Authenticate DB
sequelize.authenticate()
  .then(() => console.log('✅ DB connected'))
  .catch(err => console.error('❌ DB connection error:', err));

// ✅ Sync models
sequelize.sync({ alter: true }) // Use force: true ONLY for development
  .then(() => console.log('✅ Models synced'))
  .catch(err => console.error('❌ Model sync error:', err));

// ✅ Export models
module.exports = {
  sequelize,
  User,
  Event,
  Location,
  Registration
};
