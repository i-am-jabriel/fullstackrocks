const Sequelize = require('sequelize')
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://127.0.0.1:5432/graceShopper', {
    logging: false
  }
)
module.exports = db
