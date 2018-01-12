import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import DropDownMenu from 'material-ui/DropDownMenu'
import {fetchSingleProduct} from '../store/singleProduct'
// import {fetchAllReviews} from '../store/reviews' ??

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
            <Card>
                <div>
                    <img src={product.imageUrl} />
                    <CardTitle title={product.title} />
                    <CardText>{product.description}</CardText>

                    <h6>In Stock: {product.invQuantity}</h6>
                    <button>


                    <h5>Add To Cart</h5>
                    </button>
                    <div>
                        <h3>Product Reviews</h3>
                        {/* <NavLink to={`/users/${userId}`}>User Review</NavLink> */}
                        <h5>User's Rating for Product(stars)</h5>
                        <h6>User's feedback for product</h6>
                    </div>
                    <div>
                        <h3>Write a Review</h3>
                    </div>
                </div>
            </Card>
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