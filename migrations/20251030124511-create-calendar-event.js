await queryInterface.createTable('CalendarEvents', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: "Users",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    allowNull: false
  },
  eventTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  eventType: {
    type: Sequelize.ENUM('Fitting', 'Delivery', 'Measurement'),
    allowNull: false
  },
  eventDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  eventTime: {
    type: Sequelize.TIME,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});


// "use strict";

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable("CalendarEvents", {
//       id: {
//         allowNull: false,
//         primaryKey: true,
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4,
//       },
//       userId: {
//         type: Sequelize.UUID,
//         references: {
//           model: "Users",
//           key: "id",
//         },
//         onUpdate: "CASCADE",
//         onDelete: "CASCADE",
//         allowNull: false,
//       },
//       eventTitle: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       eventType: {
//         type: Sequelize.ENUM("Fitting", "Delivery", "Measurement"),
//         allowNull: false,
//       },
//       eventDate: {
//         type: Sequelize.DATEONLY,
//         allowNull: false,
//       },
//       eventTime: {
//         type: Sequelize.TIME,
//         allowNull: false,
//       },
//       description: {
//         type: Sequelize.TEXT,
//         allowNull: true,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable("CalendarEvents");
//   },
// };