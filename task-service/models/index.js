const { Sequelize } = require('sequelize');
const TaskModel = require('./task');

// 處理空密碼的情況
const dbConfig = {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
};

// 如果密碼不為空，才加入密碼
const sequelize = process.env.DB_PASSWORD 
  ? new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, dbConfig)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, dbConfig);

const Task = TaskModel(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  Task,
}; 