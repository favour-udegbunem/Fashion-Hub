import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: "userId", onDelete: "CASCADE" });
      User.hasMany(models.Measurement, { foreignKey: "userId", onDelete: "CASCADE" });
      User.hasMany(models.CatalogItem, { foreignKey: "userId", onDelete: "CASCADE" });
      User.hasMany(models.Event, { foreignKey: "userId", onDelete: "CASCADE" });
      User.hasMany(models.Income, { foreignKey: "userId", onDelete: "CASCADE" });
      User.hasMany(models.Expense, { foreignKey: "userId", onDelete: "CASCADE" });
      User.hasOne(models.Setting, { foreignKey: "userId", onDelete: "CASCADE" });
      User.hasMany(models.CalendarEvent, { foreignKey: "userId", as: "events", onDelete: "CASCADE" });
    }
  }

  User.init(
    {
      // ✅ Fix: define UUID primary key
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      whatsappNumber: {
        type: DataTypes.STRING,
      },
      whatsappLink: {
        type: DataTypes.STRING,
      },
      businessName: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("Tailor", "Seamstress", "Business_owner"),
        allowNull: false,
        defaultValue: "Tailor",
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );

  return User;
};