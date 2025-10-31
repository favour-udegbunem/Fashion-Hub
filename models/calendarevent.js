'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalendarEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Each event belongs to a specific user
  CalendarEvent.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
  });
    }
  }
  CalendarEvent.init({
    userId: DataTypes.UUID,
    eventTitle: DataTypes.STRING,
    eventType: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    eventTime: DataTypes.TIME,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CalendarEvent',
  });
  return CalendarEvent;
};