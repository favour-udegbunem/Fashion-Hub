// import { Model, DataTypes } from "sequelize";

// export default (sequelize) => {
//   class Measurement extends Model {
//     static associate(models) {
//       Measurement.belongsTo(models.User, { foreignKey: "userId" });
//     }
//   }

//   Measurement.init(
//     {
//       customerId: DataTypes.INTEGER,
//       userId: DataTypes.INTEGER,
//       upperBody: DataTypes.JSON,
//       waistAndHips: DataTypes.JSON,
//       fullLength: DataTypes.JSON,
//       optional: DataTypes.JSON,
//     },
//     {
//       sequelize,
//       modelName: "Measurement",
//       tableName: "Measurements",
//     }
//   );

//   return Measurement;
// };

import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Measurement extends Model {
    static associate(models) {
      Measurement.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Measurement.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // ✅ Sequelize auto-generates UUID
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      upperBody: DataTypes.JSON,
      waistAndHips: DataTypes.JSON,
      fullLength: DataTypes.JSON,
      optional: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Measurement",
      tableName: "Measurements",
    }
  );

  return Measurement;
};