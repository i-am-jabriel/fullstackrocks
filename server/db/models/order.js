const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('orders')



module.exports = Order;