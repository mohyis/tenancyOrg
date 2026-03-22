'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deliveries', {
      deliveryId: {
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
      orderId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      processedBy: {
        type: Sequelize.UUID,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'delivered'),
        allowNull: false
      },
      clothes: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('deliveries');
  }
};