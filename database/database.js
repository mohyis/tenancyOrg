const { Sequelize } = require('sequelize');
require('dotenv').config()

const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME
const dbUsername = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD


const sequelize = new Sequelize(dbName, dbUsername, password, {
  host: dbHost,
  dialect: 'mysql'
});

module.exports = sequelize;

