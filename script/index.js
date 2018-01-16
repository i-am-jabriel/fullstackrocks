const db = require('../server/db/index');

const { User, Product, Review, Category, Order, Purchase } = require('../server/db/models');

db.sync({ force: true })
    .then(() => {
        return Promise.all([

            //Create catagories
            Category.create({
                name: 'Faceted',
            }),
            Category.create({
                name: 'Rough'
            }),
            Category.create({
                name: 'Rocks'
            }),
            Category.create({
                name: 'Mineral Specimen'
            }),

            //Index4
            //Create Products
            Product.create({
                title: 'Kevin Garnet',
                description: 'Garnets ( /ˈɡɑːrnɪt/) are a group of silicate minerals that have been used since the Bronze Age as gemstones and abrasives.',
                price: 1299,
                quantity: 10,
                imageUrl: 'https://static.wixstatic.com/media/6e7517_0b00d9af3f504048902e4077b12a9a0c~mv2_d_2250_3000_s_2.jpeg/v1/fill/w_1196,h_1196,q_85,usm_0.66_1.00_0.01/6e7517_0b00d9af3f504048902e4077b12a9a0c~mv2_d_2250_3000_s_2.jpeg'
            }),
            Product.create({
                title: 'Amethyst',
                description: 'February Birthstone',
                price: 1501,
                quantity: 14,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Amethyst._Magaliesburg%2C_South_Africa.jpg/1200px-Amethyst._Magaliesburg%2C_South_Africa.jpg'
            }),
            Product.create({
                title: 'Aquamarine',
                description: 'March Birthstone',
                price: 3025,
                quantity: 9,
                imageUrl: 'https://kids.nationalgeographic.com/content/dam/kids/photos/articles/Science/A-G/aquamarine-raw.adapt.945.1.jpg'
            }),
            Product.create({
                title: 'Pink Star Diamond',
                description: 'The most rare and expensive gem. 59 karats',
                price: 83000,
                quantity: 1,
                imageUrl: 'https://www.ritani.com/wp-content/uploads/2014/11/pink-star-diamond-nbc-news1.jpg'
            }),

            //Index 8
            //Create Users

            User.create({
                name: 'bozo the clown',
                email: 'lol@ha.ha',
                password: 'abc123',
                street: '',
                state: '',
                city: '',
                zip: '11111',
                phone: '111-111-1111'
            }),
            User.create({
                name: 'second user',
                email: 'second@hotmail.co',
                password: 'you and me',
                street: '',
                state: '',
                city: '',
                zip: '11111',
                phone: '111-111-1111'
            }),

            //Index 10
        ])
            .then(arr => {
                const [
                    cat1, cat2, cat3, cat4,
                    prod1, prod2, prod3, prod4,
                    user1, user2,
                ] = arr;

                return Promise.all([
                    prod1.addCategory(cat1),
                    prod2.addCategory(cat2),
                    prod3.addCategory(cat3),
                    prod4.addCategory(cat4),
                    prod1.addCategory(cat2),
                    prod1.addCategory(cat4),
                    prod3.addCategory(cat1),

                    Review.create({
                        title: 'worst item ever made do not buy',
                        description: 'this item blinded my grandmother avoid at all costs!',
                        rating: 2,
                        userId: 1,
                        productId: 1,
                    }),
                    Review.create({
                        title: 'this isn\'t that bad',
                        description: 'infact this item is pretty good. I mean if your into this kind of stuff baka',
                        rating: 3,
                        userId: 1,
                        productId: 1,
                    }),
                    Review.create({
                        title: 'Greatest item ever created completetly lives up to the hype',
                        description: '5/5 item 7/5 with rice would buy again',
                        rating: 5,
                        userId: 1,
                        productId: 2,
                    }),
                    Review.create({
                        title: 'I live for seeding databases',
                        description: 'i do this in my sleep, litterally i dream about this shiz yo',
                        rating: 4,
                        userId: 2,
                        productId: 1,
                    }),
                    Review.create({
                        title: 'Mindless seeding',
                        description: 'Dog this item has changed my life, xzibit has changed my life',
                        rating: 1,
                        userId: 1,
                        productId: 4,
                    }),
                    Review.create({
                        title: 'This item healed me',
                        description: 'Litterally a life changing item, if you buy this i personally can guarentee that your life will only undergo positive changes, your bank account will be depleted but your spirit will be invigorated!',
                        rating: 5,
                        userId: 2,
                        productId: 3
                    }),

                    Order.create({
                        userId: 1,
                        total: 3 * 3025,
                        status: 'complete'
                    }),
                    Order.create({
                        userId: 1,
                        total: 3025 + 1299 + 1501,
                        status: 'active'
                    })
                ])
            })
            .then(() => {
                return Promise.all([
                    Purchase.create({
                        price: 3025,
                        quantity: 3,
                        orderId: 1,
                        productId: 3
                    }),
                    Purchase.create({
                        price: 3025,
                        quantity: 1,
                        orderId: 2,
                        productId: 3
                    }),
                    Purchase.create({
                        price: 1299,
                        quantity: 1,
                        productId: 1,
                        orderId: 2
                    }),
                    Purchase.create({
                        price: 1501,
                        quantity: 1,
                        productId: 2,
                        orderId: 2
                    })
                ])
            })
            .then(() => {
                console.log('finished seeding v3.1415')
                process.exit()
            })
            .catch(console.log)
    });