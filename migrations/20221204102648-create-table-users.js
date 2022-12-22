"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      profession: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.DataTypes.ENUM,
        values: ["admin", "student"],
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint("users", {
      fields: ["email"],
      type: "unique",
      name: "UNIQUE_USERS_EMAIL",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
