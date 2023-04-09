'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const newsTable = await queryInterface.createTable('news', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(75),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      summary: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      publishedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addColumn('news', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'news',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    });

    return newsTable;
  },

  async down(queryInterface) {
    return await queryInterface.dropTable('news');
  },
};
