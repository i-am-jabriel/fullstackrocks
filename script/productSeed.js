const db = require('./server/db/index');
// const Students = require('./server/db/models/students.model');
// const Campuses = require('./server/db/models/campuses.model');
const Product = require('../server/db/models/product')


const productsForDB = [
    {
        title: 'Garnet',
        description: 'Garnets ( /ˈɡɑːrnɪt/) are a group of silicate minerals that have been used since the Bronze Age as gemstones and abrasives.',
        price: 12.99,
        invQuantity: 10,
        imageUrl: 'https://static.wixstatic.com/media/6e7517_0b00d9af3f504048902e4077b12a9a0c~mv2_d_2250_3000_s_2.jpeg/v1/fill/w_1196,h_1196,q_85,usm_0.66_1.00_0.01/6e7517_0b00d9af3f504048902e4077b12a9a0c~mv2_d_2250_3000_s_2.jpeg'
    }
]

const seed = () => {
    return Product.bulkCreate(productsForDB)
}

seed()
    .then(() => {
        process.exit();
    });