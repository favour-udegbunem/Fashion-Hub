import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class UserProfile extends Model {
    static associate(models) {
      UserProfile.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }

  UserProfile.init(
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
      businessImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      whatsappNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [10, 20], // length between 10–20
        },
        whatsappLink: {
          type: DataTypes.STRING,
         allowNull: true,
      },
      },
    },
    {
      sequelize,
      modelName: "UserProfile",
      tableName: "UserProfiles",
      timestamps: true,
    }
  );

  return UserProfile;
};