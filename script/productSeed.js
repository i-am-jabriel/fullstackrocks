const db = require('../server/db/index');
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
    },
    {
        title: 'Amethyst',
        description: 'February Birthstone',
        price: 15.01,
        invQuantity: 14,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Amethyst._Magaliesburg%2C_South_Africa.jpg/1200px-Amethyst._Magaliesburg%2C_South_Africa.jpg'
    },
    {
        title: 'Aquamarine',
        description: 'March Birthstone',
        price: 30.25,
        invQuantity: 9,
        imageUrl: 'https://kids.nationalgeographic.com/content/dam/kids/photos/articles/Science/A-G/aquamarine-raw.adapt.945.1.jpg'
    },
    {
        title: 'Pink Star Diamond',
        description: 'The most rare and expensive gem. 59 karats',
        price: 83000000,
        invQuantity: 1,
        imageUrl: 'https://www.ritani.com/wp-content/uploads/2014/11/pink-star-diamond-nbc-news1.jpg'
    }
]

const seed = () => {
    return Product.bulkCreate(productsForDB)
}

seed()
    .then(() => {
        process.exit();
    });