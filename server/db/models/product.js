const Sequelize = require('sequelize')
const db = require('../db')



const Product = db.define('products', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    invQuantity: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://www.driveitnow.com/din/images/imageNotAvailable.jpg',
        validate: {
            isUrl: true
        }
    }
})




module.exports = Product;