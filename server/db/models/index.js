const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Purchase = require('./purchases')
const Review = require('./review')
const Category = require('./category')

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
//Purchase.belongsTo(Product)
//Purchase.belongsTo(Order)

Order.belongsToMany(Product,{through:'order_products'})
Product.belongsToMany(Order,{through:'order_products'})
Order.belongsTo(User)
Review.belongsTo(User)
Review.belongsTo(Product)
Product.belongsTo(Category)

module.exports = {
  User,
  Product,
  Order,
  Purchase,
  Review,
  Category
}
