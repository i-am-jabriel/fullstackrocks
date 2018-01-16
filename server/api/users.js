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
  } else {
    next()
  }
})

//Create a new user
router.post('/', (req, res, next) => {
  //should creating a user be protected?
  req.body.isAdmin = false
  //HOW DOES ONE CREATE AN ADMIN THO???

  User.create(req.body)
    .then(user => res.json(user))
    .catch(next)
})
//REDUDANCY?
//Get a specific user by id
router.get('/:userId', (req, res) => {
  if (req.user && (req.user.isAdmin || req.user.id === Number(req.params.userId))) {
    res.json(req.user)
  } else next()
})
//TODO: AUTH
//Update a user by id
router.put('/:userId', (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.id === Number(req.params.userId))) {
    req.user.update(req.body, { returning: true })
      .then(user => { console.log('DING DING', user); return user })
      .then(user => res.json(user))
      .catch(next)
  } else next()
})
//TODO: AUTH
//delete a user by id
router.delete('/:userId', (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.id === Number(req.params.userId))) {
    req.user.destroy()
      .then(rows => res.send(rows))
      .catch(next)
  } else next()
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
  } else next()
});

router.get('/:userId/cart', (req, res, next) => {
  if (req.user && req.user.isAdmin || req.user.id === Number(req.params.userId)) {
    Order.findOne({
      where: { status: 'active', userId: req.user.id },
      include: { all: true, nested: true }
    })
      .then(allCartItems => res.json(allCartItems))
      .catch(next)
  }
})

router.post('/:userId/cart', (req, res, next) => {
  if (req.user && req.user.isAdmin || req.user.id === Number(req.params.userId)) {
    Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'active'
      }
    })
      .spread((order, wasCreated) => {
        return Purchase.create({
          quantity: 1,
          orderId: Number(order.id),
          productId: Number(req.body.productId),
          price: Number(req.body.productPrice)
        })
      })
      .then(createdRow => {
        console.log(createdRow)
      })
      .catch(next)
  }
})

router.delete('/:userId/cart', (req, res, next) => {
  if (req.user && req.user.isAdmin || req.user.id === Number(req.params.userId)) {
    Purchase.destroy({
      where: {
        productId: req.body.prodId,
        orderId: req.body.orderId
      }
    })
      .then(() => res.sendStatus(204))
      .catch(next)
  }
})



router.put('/:userId/cart', (req, res, next) => {
  if (req.user && req.user.isAdmin || req.user.id === Number(req.params.userId)) {
    Purchase.update({ quantity: req.body.quantity }, {
      where: {
        orderId: req.body.orderId,
        productId: req.body.prodId
      },
      returning: true
    })
      .spread((numUpdated, updatedRowsArray) => {
        const updatedRow = updatedRowsArray[0]
        return Order.findOne({
          where: { status: 'active', userId: req.user.id },
          include: { all: true }
        })
      })
      .then(foundRow => res.json(foundRow))
      .catch(next)
  }
})






module.exports = router