const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const organization = require('./organization');

class staff extends Model {}

staff.init(
  {
   staffId: {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      profilePhoto: {
        type: DataTypes.STRING,
        allowNull: false
      },
      photoPublicId: {
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
    modelName: 'staff', // We need to choose the model name
  },
);

organization.hasMany(staff, {foreignKey: 'organizationId', as: 'staffs'})

staff.belongsTo(organization, {foreignKey: 'organizationId', as: 'tenancy'})

module.exports = staff