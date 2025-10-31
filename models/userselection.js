'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  const UserSelection = sequelize.define("UserSelection", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  });

  UserSelection.associate = (models) => {
    UserSelection.belongsTo(models.User, { foreignKey: "userId" });
    UserSelection.belongsTo(models.DressCategory, { foreignKey: "dressCategoryId" });
    UserSelection.belongsTo(models.Category, { foreignKey: "categoryId" });
    UserSelection.belongsTo(models.SubCategory, { foreignKey: "subCategoryId" });
  };

  return UserSelection;
};