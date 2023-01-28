'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
        {
          startDate: "2026-02-01",
          endDate: "2026-03-01",
          spotId: 1,
          userId: 2
        },
        {
          startDate: "2023-03-01",
          endDate: "2023-04-01",
          spotId: 2,
          userId: 3
        },
        {
          startDate: "2024-08-10",
          endDate: "2024-09-01",
          spotId: 5,
          userId: 3
        },
        {
          startDate: "2026-02-01",
          endDate: "2026-10-02",
          spotId: 4,
          userId: 1
        },
        {
          startDate: "2023-02-10",
          endDate: "2023-02-15",
          spotId: 1,
          userId: 5
        },{
          startDate: "2024-10-10",
          endDate: "2024-11-11",
          spotId: 2,
          userId: 5
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,  {
      spotId: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
