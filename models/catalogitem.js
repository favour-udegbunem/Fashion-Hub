import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class CatalogItem extends Model {
    static associate(models) {
      CatalogItem.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  CatalogItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      designName: DataTypes.STRING,
      category: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      imageUrl: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "CatalogItem",
      tableName: "CatalogItems",
    }
  );

  return CatalogItem;
};