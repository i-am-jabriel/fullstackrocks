const router = require('express').Router()
const Order = require('../db/models/order')
const Purchase = require('../db/models/purchases')

router.get('/users/:userId', (req, res, next) => {
    Purchase.findAll({
        // where: {
        //     [order.userId]: req.params.userId
        // },
        include:[ {model: Order, where: {userId: req.params.userId} } ]
    })
    .then(foundOrders => res.json(foundOrders))
})



module.exports = router