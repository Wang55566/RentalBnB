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
          address: "1 E 161 St",
          city: "Bronx",
          state: "New York",
          country: "United States of America",
          lat: 40.8296,
          lng: -73.9262,
          name: "Yankee Stadium",
          description: "It is the home field of the New York Yankees of Major League Baseball",
          price: 1000000,
          ownerId: 2
        },
        {
          address: "400 Broad St",
          city: "Seattle",
          state: "Washington",
          country: "United States of America",
          lat: 47.6205,
          lng: -122.3493,
          name: "Space Needle",
          description: "Iconic, 605-ft-tall spire at the Seattle Center, with an observation deck & a rotating restaurant",
          price: 300.33,
          ownerId: 3
        },
        {
          address: "2000 E Gene Autry Way",
          city: "Anaheim",
          state: "California",
          country: "United States of America",
          lat: 33.80027,
          lng: -117.882767,
          name: "Angel Stadium of Anaheim",
          description: "It has served as the home ballpark of the Los Angeles Angels of Major League Baseball",
          price: 5000000,
          ownerId: 4
        },
        {
          address: "3300 Las Vegas Blvd S",
          city: "Las Vegas",
          state: "Nevada",
          country: "United States of America",
          lat: 36.12166618,
          lng: -115.169832654,
          name: "Treasure Island TI Las Vegas Hotel Casino",
          description: "Treasure Island opened in 1993 and featured its namesake pirate show in front of the resort",
          price: 199.99,
          ownerId: 4
        }
      ], {});
    },

    down: async (queryInterface, Sequelize) => {
      options.tableName = 'Spots';
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options);
    }
  };
