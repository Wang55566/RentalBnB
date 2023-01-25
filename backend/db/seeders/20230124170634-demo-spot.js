'use strict';

/** @type {import('sequelize-cli').Migration} */

// Define the schema name for the Postgres production database in the options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
        {
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "App Academy",
          description: "Place where web developers are created",
          price: 123,
          ownerId: 1
        },
        {
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "App Academy",
          description: "Place where web developers are created",
          price: 123,
          ownerId: 2
        },
        {
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "App Academy",
          description: "Place where web developers are created",
          price: 123,
          ownerId: 3
        }
      ], {});
    },

    down: async (queryInterface, Sequelize) => {
      options.tableName = 'Spots';
      return queryInterface.bulkDelete(options);
    }
  };
