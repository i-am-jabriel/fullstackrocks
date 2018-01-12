import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

/**
 * COMPONENT
 */
class SingleProduct extends Component {
    componentDidMount() {
        this.props.loadOneProduct(this.props.match.params.prodId)
    }
    render() {
        const product = this.props.oneProduct
        return (
            <div>
                <img src={product.imageUrl} />
                <h3>{product.title}</h3>
                <h5>{product.description}</h5>

                <h6>In Stock: {product.invQuantity}</h6>
                <button>
                <h5>Add To Cart</h5>
                </button>
                <div>
                    <h3>Product Reviews</h3>
                    <h5>User Review</h5>
                    <h5>User's Rating for Product(stars)</h5>
                    <h6>User's feedback for product</h6>
                </div>
                <div>
                    <h3>Write a Review</h3>
                </div>
            </div>
        )
    }
}


const mapState = (state) => {
    return {
        oneProduct: state.singleProduct
        // allUsers: state.allUsers ???
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadOneProduct: function(productId) {
            dispatch(fetchSingleProduct(productId))
        }
    }
}

const SingleProductContainer = connect(mapState, mapDispatch)(SingleProduct)

export default SingleProductContainer