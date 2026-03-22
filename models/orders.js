const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const staff = require('./staff');
const organization = require('./organization');

class orders extends Model {}

orders.init(
  {
   orderId: {
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
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
      images: [{
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const value = this.getDataValue('images');
          return value ? JSON.parse(value): [];
        },

        set(val) {
          this.setDataValue('images', JSON.stringify(val));
        }
      }],

      imagePublicIds: [{
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const value = this.getDataValue('imagePublicIds');
          return value ? JSON.parse(value): [];
        },

        set(val) {
          this.setDataValue('imagePublicIds', JSON.stringify(val));
        }
      }],

      amount: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'delivered'),
        defaultValue: 'pending',
        allowNull: false
      },
       staff: {
        type: DataTypes.UUID,
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
    modelName: 'orders', // We need to choose the model name
  },
);

organization.hasMany(orders, {foreignKey: 'organizationId', as: 'order'})

orders.belongsTo(organization, {foreignKey: 'organizationId', as: 'tenancy'})

staff.hasMany(orders, {foreignKey: 'staffId', as: 'order'})

orders.belongsTo(staff, {foreignKey: 'staffId', as: 'staffs'})


module.exports = orders