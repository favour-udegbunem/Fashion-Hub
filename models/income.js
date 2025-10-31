import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Income extends Model {
    static associate(models) {
      // 🔗 Each income belongs to a user
      Income.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });

      // 🔗 Optionally, link to an order
      Income.belongsTo(models.Order, { foreignKey: "orderId", onDelete: "CASCADE" });
    }
  }

  Income.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM("Pending", "Completed", "Failed"),
        defaultValue: "Pending",
      },
    },
    {
      sequelize,
      modelName: "Income",
      tableName: "Incomes",
    }
  );

  return Income;
};