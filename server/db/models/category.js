const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('categories', {
    name: {
        type: Sequelize.STRING,
        validate: {
            len: {
                $gt: 0
            }
        }
    }
});
Category.findByName = name =>{
    return Category.findOne({where:{name}})
}

module.exports = Category