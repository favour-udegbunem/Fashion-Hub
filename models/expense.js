import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Expense extends Model {
    static associate(models) {
      Expense.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Expense.init(
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
      description: DataTypes.STRING,
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM(
          "Materials",
          "Equipment",
          "Rent",
          "Utilities",
          "Transport",
          "Marketing",
          "Other"
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Expense",
      tableName: "Expenses",
    }
  );

  return Expense;
};