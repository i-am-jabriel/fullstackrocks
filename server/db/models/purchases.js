const Sequelize = require('sequelize')
const db = require('../db')




const Purchase = db.define('purchases', {
    purchasePrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    quanity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})



module.exports = Purchase