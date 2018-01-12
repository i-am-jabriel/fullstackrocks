const router = require('express').Router()
const Order = require('../db/models/order')
const Purchase = require('../db/models/purchases')

router.get('/',(req,res,next) => {
    if(req.user && (req.userisAdmin || 1))return next();
    Order.findAll()
        .then(orders => res.json(orders))
        .catch(next);
});
/*router.param('userId', (req, res, next, userId) => {
    Purchase.findAll({
        include: [
            {
                model: Order,
                where: {
                    userId: req.params.userId
                }
            }]
    })
        .then(foundOrders => {
            if (!foundOrders) {
                const err = new Error('Orders not found!');
                err.status = 404;
                throw err
            }
            req.orders = foundOrders
            next()
            return null
        })
        .catch(next)
})

router.param('orderId', (req, res, next, orderId) => {
    Order.findById(orderId)
        .then(foundOrder => {
            if (!foundOrder) {
                const err = new Error('Order not found!');
                err.status = 404
                throw err
            }
            req.singleOrder = foundOrder
            next()
            return null
        })
        .catch(next)
})


router.get('/users/:userId', (req, res, next) => {
    res.json(req.orders)
})

router.get('/:orderId', (req, res, next) => {
    res.json(req.singleOrder)
})*/

module.exports = router