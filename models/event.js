// import { Model } from ('sequelize');
// export default (sequelize, DataTypes) => {
//   class Event extends Model {
//     static associate(models) {
//       Event.belongsTo(User, { foreignKey: "userId" });
//     }
//   }
//   Event.init({
//     userId: DataTypes.INTEGER,
//     title: DataTypes.STRING,
//     type: DataTypes.STRING,
//     date: DataTypes.DATE,
//     time: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Event',
//   });
//   return Event;
// };

import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Event.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      type: DataTypes.STRING,
      date: DataTypes.DATE,
      time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "Events",
    }
  );

  return Event;
};