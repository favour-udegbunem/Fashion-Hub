'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Expenses', {
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
      category: {
        type: Sequelize.ENUM("Materials", "Equipment", "Rent", "Utilities", "Transport", "Marketing", "Other"),
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
    await queryInterface.dropTable('Expenses');
  }
};