const router = require('express').Router()
const Order = require('../db/models/order')
const Purchase = require('../db/models/purchases')


//TODO: AUTH
router.get('/', (req, res, next) => {
    if ((req.user && req.user.isAdmin) && 0) return next();
    Order.findAll({ include: { all: true } })
        .then(orders => res.json(orders))
        .catch(next);
});

router.put('/', (req, res, next) => {
    Order.update({ status: 'complete' }, {
        where: {
            id: req.body.orderId
        },
        returning: true
    })
        .spread((numUpdated, updatedRowsArray) => {
            res.json(updatedRowsArray[0])
        })
        .catch(next)
})






module.exports = router