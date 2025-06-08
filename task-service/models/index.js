const { Sequelize } = require('sequelize');
const TaskModel = require('./task');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const Task = TaskModel(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  Task,
}; 