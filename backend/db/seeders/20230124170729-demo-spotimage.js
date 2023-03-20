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
          url: "https://hips.hearstapps.com/hmg-prod/images/bojnice-castle-1603142898.jpg?crop=1.00xw:0.752xh;0,0.0240xh&resize=1200:*",
          preview: true,
          spotId: 3
        },
        {
          url: "https://hips.hearstapps.com/hmg-prod/images/bojnice-castle-1603142898.jpg?crop=1.00xw:0.752xh;0,0.0240xh&resize=1200:*",
          preview: true,
          spotId: 2
        },
        {
          url: "https://hips.hearstapps.com/hmg-prod/images/bojnice-castle-1603142898.jpg?crop=1.00xw:0.752xh;0,0.0240xh&resize=1200:*",
          preview: true,
          spotId: 1
        },
        {
          url: "https://hips.hearstapps.com/hmg-prod/images/bojnice-castle-1603142898.jpg?crop=1.00xw:0.752xh;0,0.0240xh&resize=1200:*",
          preview: true,
          spotId: 5
        },
        {
          url: "https://hips.hearstapps.com/hmg-prod/images/bojnice-castle-1603142898.jpg?crop=1.00xw:0.752xh;0,0.0240xh&resize=1200:*",
          preview: true,
          spotId: 4
        }
      ], {});
    },

    down: async (queryInterface, Sequelize) => {
      options.tableName = 'SpotImages';
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options);
    }
  };
