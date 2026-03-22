const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const staff = require('./staff');
const organization = require('./organization');

class equipments extends Model {}

equipments.init(
  {
   equipmentId: {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      expiringDate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('available', 'under maintenance'),
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
    modelName: 'equipments', // We need to choose the model name
  },
);

organization.hasMany(equipments, {foreignKey: 'organizationId', as: 'equip'})

equipments.belongsTo(organization, {foreignKey: 'organizationId', as: 'tenancy'})

staff.hasMany(equipments, {foreignKey: 'staffId', as: 'equip'})

equipments.belongsTo(staff, {foreignKey: 'staffId', as: 'staffs'})

module.exports = equipments