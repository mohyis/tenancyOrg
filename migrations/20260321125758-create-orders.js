'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      orderId: {
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
      type: {
        type: Sequelize.STRING,
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
      amount: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'delivered'),
        defaultValue: 'pending',
        allowNull: false
      },
       staff: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('orders');
  }
};