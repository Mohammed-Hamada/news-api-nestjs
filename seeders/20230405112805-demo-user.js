'use strict';

const { hash } = require('argon2');
const { faker } = require('@faker-js/faker');

const generateFakeUsers = async () => {
  const users = [];

  for (let i = 0; i < 100; i++) {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: await hash('123456'),
      gender: faker.name.sex(),
    };

    users.push(user);
  }

  return users;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users = await generateFakeUsers();

    return await queryInterface.bulkInsert('users', users);
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('users');
  },
};
