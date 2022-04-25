const Sequelize = require('sequelize');
const config = new Sequelize('planner', 'root', 'password', {dialect: 'mysql'});

module.exports = config;