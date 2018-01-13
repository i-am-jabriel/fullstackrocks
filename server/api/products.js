const router = require('express').Router()
const { Product,Category, Review, User } = require('../db/models')

//If we going to look for a specific product from params preload that and have it available to the request
router.param('prodId', (req, res, next, prodId) => {
    Product.findById(prodId)
        .then(function (product) {
            if (!product) {
                const err = new Error('Product not found!');
                err.status = 404
                throw err
            }
            req.product = product
            next()
            return null
        })
        .catch(next)
})

//Get all products
router.get('/', (req, res, next) => {
    Product.findAll({include:[{model:Category}]})
        .then(products => res.json(products))
        .catch(next)
})

//Create a new product
router.post('/', (req, res, next) => {
    Product.create(req.body)
        .then(product => res.json(product))
        .catch(next)
})

//Get a specific item by id
router.get('/:prodId', (req, res, next) => {
    res.json(req.product)
})

router.get('/:prodId/reviews', (req, res, next) => {
    Review.findAll({
        where: {productId: req.params.prodId},
        include: {model: User}
    })
    .then(productReviews => res.json(productReviews))
    .catch(next)
})

//Edit a item by id
router.put('/:prodId', (req, res, next) => {
    req.product.update(req.body, { returning: true })
        .then(product => res.json(product))
        .catch(next)
})

//delete a product by id
router.delete('/:prodId', (req, res, next) => {
    req.product.destroy()
        .then(rows => res.send(rows))
        .catch(next)
})

module.exports = router