require('dotenv').config()

const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME
const dbUsername = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

module.exports = {
  "development": {
    "username": dbUsername,
    "password": password,
    "database": dbName,
    "host": dbHost,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
