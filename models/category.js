'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
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

  Category.associate = (models) => {
    Category.belongsTo(models.DressCategory, { foreignKey: "dressCategoryId" });
    Category.hasMany(models.SubCategory, { foreignKey: "categoryId" });
    Category.hasMany(models.UserSelection, { foreignKey: "categoryId" });
  };

  return Category;
};