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
  if (req.user && req.user.isAdmin) {
    User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
      .then(users => res.json(users))
      .catch(next)
  }
})

//Create a new user
router.post('/', (req, res, next) => {
  //should creating a user be protected?
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next)
})
//REDUDANCY?
//Get a specific user by id
router.get('/:userId', (req, res) => {
  if (req.user && req.user.isAdmin || req.user.id === Number(req.params.userId)) {
    res.json(req.user)
  }
})
//TODO: AUTH
//Update a user by id
router.put('/:userId', (req, res, next) => {
  if (req.user && req.user.isAdmin || req.user.id === Number(req.params.userId)) {
    req.user.update(req.body, { returning: true })
      .then(user => res.json(user))
      .catch(next)
  }
})
//TODO: AUTH
//delete a user by id
router.delete('/:userId', (req, res, next) => {
  if (req.user && req.user.isAdmin || req.user.id === Number(req.params.userId)) {
    req.user.destroy()
      .then(rows => res.send(rows))
      .catch(next)
  }
})

//Get all orders for a user
//TODO: AUTH
router.get('/:userId/orders', (req, res, next) => {
  if (req.user && req.user.isAdmin || req.user.id === Number(req.params.userId)) {
    Order.findAll({
      where: { userId: req.params.userId },
      include: { all: true }
    })
      .then(orders => res.json(orders))
      .catch(next)
  }
});

router.get('/:userId/cart', (req, res, next) => {
  Order.findAll({
    where: { status: 'active' },
    include: { all: true }
  })
    .then(allCartItems => res.json(allCartItems))
    .catch(next)
})

module.exports = router