'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class CalendarEvent extends Model {
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