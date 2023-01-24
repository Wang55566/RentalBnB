'use strict';

/** @type {import('sequelize-cli').Migration} */

// Define the schema name for the Postgres production database in the options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
        {
          url: "exmaple.com",
          preview: true,
          spotId: 3
        },
        {
          url: "exmaple2.com",
          preview: true,
          spotId: 2
        },
        {
          url: "exmaple3.com",
          preview: false,
          spotId: 1
        }
      ], {});
    },

    down: async (queryInterface, Sequelize) => {
      options.tableName = 'Spots';
      return queryInterface.bulkDelete(options);
    }
  };
