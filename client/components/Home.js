import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductPreview from './ProductPreview'
import { fetchProducts } from '../store/allProducts'
import { addProductToCart } from '../store/activeOrder'
import Footer from './Footer'

/**
 * COMPONENT
 */

class Home extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.loadProducts()
    }

    render() {
        return (
            <div className='homePageContainer'>
                <h1>FullStack ROCKS!</h1>
                <h4>Your ONE STOP SHOP for ROCKS, MINERALS & EXPENSIVE JEWELRY</h4>
                <p>You need some rocks? WE GOT DAT ROCKS</p>
                <div className='homePageBanner'>
                    <img className='bannerImage' src='Imgs/garnet_Sapphire.JPG' />
                </div>
                {
                    this.props.allProducts.slice(0, 3).map(product =>
                        (
                            <ProductPreview key={product.id} product={product} currentUser={this.props.currentUser} addProductToCart={this.props.addProductToCart} />
                        ))
                }
                <Footer />
            </div>
        )
    }
}


function mapStateToProps(storeState) {
    return {
        allProducts: storeState.allProducts,
        currentUser: storeState.currentUser
    }
}
function mapDispactToProps(dispatch, ownProps) {
    return {
        loadProducts: () => {
            dispatch(fetchProducts())
        },
        addProductToCart: (userId, prodId, price) => {
            dispatch(addProductToCart(userId, prodId, price, ownProps.history))
        }
    }
}


const HomeContainer = connect(mapStateToProps, mapDispactToProps)(Home);


export default HomeContainer;
