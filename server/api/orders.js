const router = require('express').Router()
const Order = require('../db/models/order')
const Purchase = require('../db/models/purchases')

router.get('/users/:userId', (req, res, next) => {
    Order.findAll({
        include:[Purchase]
    })
    .then(foundOrders => res.json(foundOrders))
})



module.exports = router