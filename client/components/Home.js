import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductPreview from './ProductPreview'
import { fetchProducts } from '../store/allProducts'
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
                <div className='homePageBanner'>
                    <img className='bannerImage' src='Imgs/garnet_Sapphire.jpg' />
                </div>
                {
                    this.props.allProducts.slice(0, 3).map(product =>
                        (
                            <ProductPreview key={product.id} product={product} />
                        ))
                }
                <Footer />
            </div>
        )
    }
}


function mapStateToProps(storeState) {
    return {
        allProducts: storeState.allProducts
    }
}
function mapDispactToProps(dispatch, ownProps) {
    return {
        loadProducts: () => {
            dispatch(fetchProducts())
        }
    }
}


const HomeContainer = connect(mapStateToProps, mapDispactToProps)(Home);


export default HomeContainer;