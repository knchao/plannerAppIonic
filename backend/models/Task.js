const Sequelize = require('sequelize');
const config = require('./../config');

const Task = config.define('Task', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_of_start: {
        type: Sequelize.DATE,
        allowNull: false
    },
    date_of_end: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('Not Done', 'Done'),
        allowNull: false
    },
    completion_date: {
         type: Sequelize.DATE,
         allowNull: true
     },
    weekly_task: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    monthly_goal: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    hasNote: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    noteHeader: {
        type: Sequelize.STRING,
        allowNull: true
    },
    noteDetail: {
        type: Sequelize.STRING,
        allowNull: true
    },
    noteImportance: {
        type: Sequelize.ENUM('Low', 'Medium', 'High'),
        allowNull: true
    }
}, {timestamps: false});

module.exports = Task;