const router = require('express').Router()
const { User, Order, Purchase } = require('../db/models')

//If we going to look for a specific product from params preload that and have it available to the request
router.param('userId', (req, res, next, userId) => {
  User.findById(userId,
    {
      attributes: ['id', 'email', 'name', 'googleId', 'isAdmin', 'forcePasswordReset']
    })
    .then(function (user) {
      if (!user) {
        const err = new Error('User not found!')
        err.status = 404
        throw err
      }
      req.user = user
      next()
      return null
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

//Create a new user
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next)
})
//REDUDANCY?
//Get a specific user by id
router.get('/:userId', (req, res) => {
  res.json(req.user)
})
//TODO: AUTH
//Update a user by id
router.put('/:userId', (req, res, next) => {
  req.user.update(req.body, { returning: true })
    .then(user => res.json(user))
    .catch(next)
})
//TODO: AUTH
//delete a user by id
router.delete('/:userId', (req, res, next) => {
  req.user.destroy()
    .then(rows => res.send(rows))
    .catch(next)
})

//Get all orders for a user
//TODO: AUTH
router.get('/:uid/orders', (req, res, next) => {
  Order.findAll({
    where: { userId: req.params.uid},
    include: {all: true}
  })
    .then(orders => res.json(orders))
    .catch(next)
});

module.exports = router