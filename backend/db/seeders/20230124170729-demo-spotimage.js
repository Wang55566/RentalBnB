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
          url: "spotimage1.com",
          preview: true,
          spotId: 3
        },
        {
          url: "spotimage2.com",
          preview: true,
          spotId: 2
        },
        {
          url: "spotimage3.com",
          preview: false,
          spotId: 1
        },
        {
          url: "spotimage4.com",
          preview: false,
          spotId: 2
        },
        {
          url: "spotimage5.com",
          preview: true,
          spotId: 5
        }
      ], {});
    },

    down: async (queryInterface, Sequelize) => {
      options.tableName = 'SpotImages';
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options,  {
        spotId: { [Op.in]: [1,2,3,4,5] }
      }, {});
    }
  };
