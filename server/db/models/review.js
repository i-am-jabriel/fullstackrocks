const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('reviews',{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    rating:{
        type:Sequelize.INTEGER,
        allowNull:null,
        validate:{
            min:1,
            max:5
        }
    }
});

module.exports = Review;