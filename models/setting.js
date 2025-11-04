// import { Model } from('sequelize');
// export default (sequelize, DataTypes) => {
//   class Setting extends Model {
//     static associate(models) {
//       Setting.belongsTo(User, { foreignKey: "userId" });
//     }
//   }
//   Setting.init({
//     userId: DataTypes.INTEGER,
//     logoUrl: DataTypes.STRING,
//     businessName: DataTypes.STRING,
//     ownerName: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     whatsapp: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Setting',
//   });
//   return Setting;
// };


import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Setting extends Model {
    static associate(models) {
      Setting.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Setting.init(
    {
      userId: DataTypes.UUID,
      logoUrl: DataTypes.STRING,
      businessName: DataTypes.STRING,
      ownerName: DataTypes.STRING,
      phone: DataTypes.STRING,
      whatsapp: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Setting",
      tableName: "Settings",
    }
  );

  return Setting;
};