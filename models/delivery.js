const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const organization = require('./organization');
const staff = require('./staff');
const orders = require('./orders');

class delivery extends Model {}

delivery.init(
  {
   deliveryId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      organizationId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'organization',
          key: 'organizationId'
        },
        onDelete: 'CASCADE'
      },
      staffId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'staff',
          key: 'staffId'
        },
        onDelete: 'CASCADE'
      },
      orderId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'order',
          key: 'orderId'
        },
        onDelete: 'CASCADE'
      },
      processedBy: {
        type: DataTypes.UUID,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'delivered'),
        allowNull: false
      },
      clothes: {
        type: DataTypes.STRING,
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
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'delivery', // We need to choose the model name
  },
);

organization.hasMany(delivery, {foreignKey: 'organizationId', as: 'deliver'})

delivery.belongsTo(organization, {foreignKey: 'organizationId', as: 'tenancy'})

staff.hasMany(delivery, {foreignKey: 'staffId', as: 'deliver'})

delivery.belongsTo(staff, {foreignKey: 'staffId', as: 'staffs'})

orders.hasMany(delivery, {foreignKey: 'orderId', as: 'deliver'})

delivery.belongsTo(orders, {foreignKey: 'orderId', as: 'order'})

module.exports = delivery