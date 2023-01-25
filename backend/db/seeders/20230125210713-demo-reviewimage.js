'use strict';

/** @type {import('sequelize-cli').Migration} */

// Define the schema name for the Postgres production database in the options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
        {
          url: "reviewimage1.com",
          reviewId: 2
        },
        {
          url: "reviewimage2.com",
          reviewId: 3
        },
        {
          url: "reviewimage3.com",
          reviewId: 1
        }
      ], {});
    },

    down: async (queryInterface, Sequelize) => {
      options.tableName = 'ReviewImages';
      return queryInterface.bulkDelete(options);
    }
  };
