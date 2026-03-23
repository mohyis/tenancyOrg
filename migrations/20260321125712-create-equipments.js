'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipments', {
      equipmentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
       organizationId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      staffId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      expiringDate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('available', 'under maintenance'),
        allowNull: false
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      imagePublicIds: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('equipments');
  }
};