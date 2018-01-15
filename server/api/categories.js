const router = require('express').Router()
const { Category } = require('../db/models')


router.get('/', (req, res, next) => {
    Category.findAll({})
        .then(categories => res.json(categories))
        .catch(next);
})

//TODO: AUTH
router.post('/', (req, res, next) => {
    Category.create(req.body,{returning:true})
        .then(category => res.json(category))
        .catch(next);
})

module.exports = router;

