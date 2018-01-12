const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
    status: {type: Sequelize.ENUM('active, canceled') },
    orderDate: Sequelize.DATE,
    shipDate: Sequelize.DATE
})

module.exports = Order