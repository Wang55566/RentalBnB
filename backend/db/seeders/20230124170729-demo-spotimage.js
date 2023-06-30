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
          url: "https://upload.wikimedia.org/wikipedia/commons/2/23/Space_Needle_2011-07-04.jpg",
          preview: true,
          spotId: 3
        },
        {
          url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/2b/40/ce/photo0jpg.jpg?w=1200&h=-1&s=1",
          preview: true,
          spotId: 2
        },
        {
          url: "https://hips.hearstapps.com/hmg-prod/images/bojnice-castle-1603142898.jpg?crop=1.00xw:0.752xh;0,0.0240xh&resize=1200:*",
          preview: true,
          spotId: 1
        },
        {
          url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/be/34/8d/treasure-island-ti-hotel.jpg?w=1200&h=-1&s=1",
          preview: true,
          spotId: 5
        },
        {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Angelstadiummarch2019.jpg/1280px-Angelstadiummarch2019.jpg",
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
