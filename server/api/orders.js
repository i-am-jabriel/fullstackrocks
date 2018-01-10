const router = require('express').Router()
const {Order} = require('../db/models/order')

router.get('/users/:userId', (req, res, next) => {
    console.log("this is running: ", req.params)

})



module.exports = router