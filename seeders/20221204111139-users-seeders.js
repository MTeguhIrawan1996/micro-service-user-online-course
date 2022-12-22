"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    await queryInterface.bulkInsert("users", [
      {
        name: "Bowo",
        profession: "Web Dev",
        email: "teguhirawan1996@gmail.com",
        role: "admin",
        password: await bcrypt.hash("rahasia", salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Teguh",
        profession: "Mobile Dev",
        email: "irawan.ikhal@gmail.com",
        role: "student",
        password: await bcrypt.hash("rahasia1", salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
