const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Purchase = require('./purchases')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Purchase.belongsToMany(Order, { through: 'order_purchase' })
Purchase.belongsTo(Product)
Order.belongsToMany(Purchase, { through: 'order_purchase' })
Order.belongsTo(User)
User.belongsToMany(Order, { through: 'user_order' })




module.exports = {
  User,
  Product,
  Order,
  Purchase
}
