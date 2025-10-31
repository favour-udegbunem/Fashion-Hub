// DressCategory.js
'use strict';
export default (sequelize, DataTypes) => {
  const DressCategory = sequelize.define("DressCategory", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM("Men", "Women", "Both"),
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
  });

  DressCategory.associate = (models) => {
    DressCategory.hasMany(models.Category, { foreignKey: "dressCategoryId" });
    DressCategory.hasMany(models.UserSelection, { foreignKey: "dressCategoryId" });
  };

  return DressCategory;
};