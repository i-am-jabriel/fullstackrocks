const db = require('../server/db/index');
// const Students = require('./server/db/models/students.model');
// const Campuses = require('./server/db/models/campuses.model');
const Purchase = require('../server/db/models/purchases')


const purchasesForDb = [
    {
        purchasePrice: 10.99,
        quantity: 3,
        productId: 2,
        orderId: 1
    },
    {
        purchasePrice: 10.99,
        quantity: 3,
        productId: 2,
        orderId: 1
    }
]

const seed = () => {
    return Purchase.bulkCreate(purchasesForDb)
}

seed()
    .then(() => {
        process.exit();
    });