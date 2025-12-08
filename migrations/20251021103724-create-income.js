'use strict';

const { DataTypes, UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Incomes', {
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
        onDelete: "CASCADE",
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
paymentStatus: {
  type: Sequelize.ENUM(
    "Pending Payment",
    "Partial Payment", 
    "Deposit Received",    // ← FIXED: Received, not Recieved
    "Paid in Full"         // ← MUST BE EXACTLY THIS
  ),
  allowNull: false,
  defaultValue: "Pending Payment"   // ← THIS IS CRITICAL
},
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: "Orders",
          key: "id"
        },
        onDelete: "CASCADE",
        allowNull: false
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Incomes');
  }
};