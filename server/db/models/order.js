const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
    status: Sequelize.ENUM('active', 'canceled', 'complete'),
    shipDate: Sequelize.DATE,
    total: Sequelize.INTEGER,
})

module.exports = Order