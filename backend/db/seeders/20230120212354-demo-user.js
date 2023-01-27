'use strict';
const bcrypt = require("bcryptjs");

// Define the schema name for the Postgres production database in the options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
up: async (queryInterface, Sequelize) => {
  options.tableName = 'Users';
  return queryInterface.bulkInsert(options, [
      {
        email: 'userOne@gmail.com',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'SHohei',
        lastName:'Ohtani'
      },
      {
        email: 'userTwo@gmail.com',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Mike',
        lastName:'Trout'
      },
      {
        email: 'userThree@gmail.com',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'James',
        lastName:'Harden'
      },
      {
        email: 'userFour@gmail.com',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'Chris',
        lastName:'Paul'
      },
      {
        email: 'userFive@gmail.com',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Bryce',
        lastName:'Harper'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
