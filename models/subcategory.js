'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  const SubCategory = sequelize.define("SubCategory", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  SubCategory.associate = (models) => {
    SubCategory.belongsTo(models.Category, { foreignKey: "categoryId" });
    SubCategory.hasMany(models.UserSelection, { foreignKey: "subCategoryId" });
  };

  return SubCategory;
};