const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('products', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                $gt: 0
            }
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            len: {
                $gt: 0
            }
        }
    },
    price: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
            len: {
                $gt: 0
            }
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
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
}, {
        getterMethods: {
            showPrice() {
                let dollars = this.price / 100
                let cents = this.price % 100
                if (cents === 0) {
                    cents = '00'
                }
                return dollars + '.' + cents
            }
        },
        hooks: {
            //convert given price to cents and store as INT
            beforeCreate: (Product) => {
                Product.price = Product.price * 100
            }
        }

    })









module.exports = Product