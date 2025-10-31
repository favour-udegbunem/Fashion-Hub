// 'use strict';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('Measurements', {
//       id: {
//         allowNull: false,
//         primaryKey: true,
//         type: Sequelize.STRING,
//         // defaultValue: Sequelize.fn('UUID'), // ✅ this makes MySQL generate the UUID automatically
//       },
//       userId: {
//         type: Sequelize.UUID,
//         references: {
//           model: "Users",
//           key: "id"
//         },
//         onUpdate: "CASCADE",
//         onDelete: "CASCADE",
//         allowNull: false
//       },
//       upperBody: {
//         type: Sequelize.JSON
//       },
//       waistAndHips: {
//         type: Sequelize.JSON
//       },
//       fullLength: {
//         type: Sequelize.JSON
//       },
//       optional: {
//         type: Sequelize.JSON
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
//       }
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('Measurements');
//   }
// };


'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Measurements', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('(UUID())'), // ✅ MySQL-compatible default
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      upperBody: {
        type: Sequelize.JSON,
      },
      waistAndHips: {
        type: Sequelize.JSON,
      },
      fullLength: {
        type: Sequelize.JSON,
      },
      optional: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Measurements');
  },
};