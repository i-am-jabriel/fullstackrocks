const db = require('../server/db/index');
// const Students = require('./server/db/models/students.model');
// const Campuses = require('./server/db/models/campuses.model');
const Order = require('../server/db/models/order')


const ordersForDb = [
    {
        userId: 1
    },
    {
       userId: 2
    }
]

const seed = () => {
    return Order.bulkCreate(ordersForDb)
}

seed()
    .then(() => {
        process.exit();
    });