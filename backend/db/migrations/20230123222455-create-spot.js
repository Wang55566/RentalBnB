'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING,
        allowNullL:false
      },
      city: {
        type: Sequelize.STRING,
        allowNullL:false
      },
      state: {
        type: Sequelize.STRING,
        allowNullL:false
      },
      country: {
        type: Sequelize.STRING,
        allowNullL:false
      },
      lat: {
        type: Sequelize.DECIMAL,
        allowNullL:false
      },
      lng: {
        type: Sequelize.DECIMAL,
        allowNullL:false
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNullL:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};
