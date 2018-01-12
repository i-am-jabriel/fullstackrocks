const Sequelize = require('sequelize')
const db = require('../db')

const Purchase = db.define('order_purchases', {
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Purchase