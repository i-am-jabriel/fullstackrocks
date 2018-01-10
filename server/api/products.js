const router = require('express').Router()
const {Product} = require('../db/models')

router.param('prodId', (req, res, next, prodId) => {
    Product.findById(prodId)
    .then(function(product){
        if(!product) {
            const err = new Error('Product not found!');
            err.status = 404;
            throw err;
        }
        req.product = product;
        next();
        return null;
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
    Product.findAll({})
    .then(products => res.json(products))
    .catch(next);
});

router.post('/', (req, res, next) => {
    Product.create(req.body)
    .then(product => res.json(product))
    .catch(next);
});

router.get('/:prodId', (req, res) => {
    res.json(req.product);
});

router.put('/:prodId', (req, res, next) => {
    req.product.update(req.body, {returning: true})
    .then(product => res.json(product))
    .catch(next);
});

router.delete('/:prodId', (req, res, next) => {
    req.product.destroy()
    .then(rows => res.send(rows))
    .catch(next);
});

module.exports = router;