'use strict';

const { faker } = require('@faker-js/faker');

const generateFakeNews = async (users) => {
  const news = [];

  users.forEach((user) => {
    for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
      let singleNews = {
        title: faker.word.noun(),
        slug: faker.lorem.slug(2),
        summary: faker.lorem.words(7),
        published: faker.datatype.boolean(),
        content: faker.lorem.paragraph(7),
        userId: user.id,
      };

      if (singleNews.published) {
        singleNews = { ...singleNews, publishedAt: new Date() };
      }

      news.push(singleNews);
    }
  });
  return news;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [users] = await queryInterface.sequelize.query(
      `SELECT id from users;`,
    );

    const news = await generateFakeNews(users);

    return await queryInterface.bulkInsert('news', news, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('news');
  },
};
