const router = require('express').Router()
const { Product, Category, Review, User} = require('../db/models')

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
router.param('categoryName', (req, res, next, name) => {
    Category.findOne({where:{name}})
        .then(function (category) {
            if (!category) {
                const err = new Error('Category not found!');
                err.status = 404
                throw err
            }
            req.category = category
            next()
            return null
        })
        .catch(next)
})

//Get all products
router.get('/', (req, res, next) => {
    if(req.query.category){
        return Product.findAll({
            include: [{
                model: Category,
                where:{name: req.query.category}
            }]
        })
            .then(products => res.json(products))
            .catch(next)
    }
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
    console.log("this is req.sesh: ", req.session.id)
    res.json(req.product)
})

//Get all reviews for a specific item
router.get('/:prodId/reviews', (req, res, next) => {
    Review.findAll({
        where: {productId: req.params.prodId},
        include: {model: User}
    })
    .then(productReviews => res.json(productReviews))
    .catch(next)
})

// Create a Product Review
router.post('/:prodId/review', (req, res, next) => {
  Review.create(Object.assign({}, req.body, {productId: Number(req.params.prodId), userId: req.user.id}))
  .then(productReviews => res.json(productReviews))
  .catch(next)
})


//Add or remove a category to a specific item
//TODO: AUTH
/*router.get('/:prodId/addCategory/:categoryName',(req,res,next) => {
    req.product.addCategory(req.category)
    .then(data => res.sendStatus(200))
    .catch(next)
})
//TODO: AUTH
router.get('/:prodId/removeCategory/:categoryName',(req,res,next) => {
    req.product.removeCategory(req.category)
        .then(data => res.sendStatus(200))
        .catch(next)
})*/

//Edit a item by id
router.put('/:prodId', (req, res, next) => {
    if(req.body.category){
        Category.findByName(req.body.category)
            .then(category=>{
                switch(req.body.action){
                    case 'add':
                        return req.product.addCategory()
                            .then(product => res.json(product))
                    case 'remove':
                        return req.product.removeCategory(Category.findByName(req.body.category))
                            .then(product => res.json(product))
                    default:
                        return res.sendStatus(400)
                }
            })
    }
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
