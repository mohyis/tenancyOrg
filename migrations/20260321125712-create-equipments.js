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
        type: Sequelize.JSON,
        allowNull: false
      },
      imagePublicIds: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('equipments');
  }
};