'use strict';

/** @type {import('sequelize-cli').Migration} */

// Define the schema name for the Postgres production database in the options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
        {
          review: "review1",
          stars: 5,
          spotId: 2,
          userId: 3
        },
        {
          review: "review2",
          stars: 2,
          spotId: 3,
          userId: 2
        },
        {
          review: "review3",
          stars: 3,
          spotId: 1,
          userId: 3
        },
        {
          review: "review4",
          stars: 3,
          spotId: 5,
          userId: 4
        },
        {
          review: "review5",
          stars: 3,
          spotId: 3,
          userId: 1
        }
      ], {});
    },

    down: async (queryInterface, Sequelize) => {
      options.tableName = 'Reviews';
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options);
    }
  };
