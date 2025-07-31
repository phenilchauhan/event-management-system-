module.exports = (sequelize, DataTypes) =>
  sequelize.define('Registration', {
    status: { type: DataTypes.ENUM('registered', 'cancelled'), defaultValue: 'registered' }
  }, { timestamps: true, createdAt: 'registration_date', updatedAt: false });
