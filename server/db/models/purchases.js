const Sequelize = require('sequelize')
const db = require('../db')

const Purchase = db.define('order_products', {
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Purchase