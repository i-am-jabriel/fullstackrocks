import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import DropDownMenu from 'material-ui/DropDownMenu'
import { fetchSingleProduct } from '../store/singleProduct'
import { fetchProductReviews, postReview } from '../store/productReviews'
import ProductReviews from './ProductReviews'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { ValidatorForm } from 'react-form-validator-core'
import { TextValidator } from 'react-material-ui-form-validator'
import { addProductToCart, addProdToCart } from '../store/activeOrder'

/**
 * COMPONENT
 */
class SingleProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            rating: '',
            description: ''
        }
        this.handleTitle = this.handleTitle.bind(this)
        this.handleRating = this.handleRating.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleTitle(event) {
        this.setState({ title: event.target.value })
    }

    handleRating(event) {
        this.setState({ rating: event.target.value })
    }

    handleDescription(event) {
        this.setState({ description: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.postUserReview(this.state, this.props.match.params.prodId, this.props.history, this.props.currentUser)
        this.setState({ title: '', rating: '', description: '' })
    }

    componentDidMount() {
        this.props.loadOneProduct(this.props.match.params.prodId)
        this.props.loadReviews(this.props.match.params.prodId);
    }
    render() {
        const product = this.props.oneProduct
        const style = {
            margin: 12,
        }


        return (
                <div>
                <Card>
                    <img className='singleProdImage' src={product.imageUrl} />
                    <div style={{ margin: 40 }}>
                        <CardTitle title={product.title} subtitle={"In Stock: " + product.quantity}/>
                        <CardText>{product.description}</CardText>

                        <RaisedButton onClick={() => addProductToCart(this.props.currentUser.id, product.id, product.price)} label="Add to Cart" />

                    </div>
                </Card>

                    <div style={{ margin: 40 }}>
                        <h4>Product Reviews</h4>
                        <ProductReviews reviews={this.props.reviews} />
                    </div>
                    <div className="submit-product-review" style={{ margin: 40 }}>
                        <ValidatorForm className="form-horizontal" onSubmit={this.handleSubmit}>
                            <label htmlFor="reviewTitle">Write a review</label>
                            <div className="form-group">

                                <TextValidator
                                    hintText="Enter Title"
                                    name="title"
                                    id="reviewTitle"
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={this.state.title}
                                    onChange={this.handleTitle}
                                /><br />

                                <TextValidator
                                    name="rating"
                                    hintText="Enter Rating from 1 to 5"
                                    type="number"
                                    validators={['required', 'minNumber:1', 'maxNumber:5']}
                                    errorMessages={['this field is required', 'Rating cannot be less than 1', 'Rating cannot be greater than 5']}
                                    value={this.state.rating}
                                    onChange={this.handleRating}
                                /><br />

                                <TextValidator
                                    name="review"
                                    multiLine={true}
                                    hintText="Enter Review Text"
                                    rows={4}
                                    rowsMax={6}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={this.state.description}
                                    onChange={this.handleDescription}
                                />
                            </div>

                            <div className="form-group">
                                <RaisedButton label="Submit Review" type="submit" style={style} />
                            </div>
                        </ValidatorForm>
                    </div>
                </div>

        )
    }
}


const mapState = (state) => {
    return {
        oneProduct: state.singleProduct,
        reviews: state.reviews,
        currentUser: state.currentUser
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadOneProduct: function (productId) {
            dispatch(fetchSingleProduct(productId))
        },
        loadReviews: function (productId) {
            dispatch(fetchProductReviews(productId))
        },
        postUserReview: function (review, prodId, history, user) {
            dispatch(postReview(review, prodId, history, user))
        },
        addProductToCart: function (userId, prodId, price) {
            dispatch(addProdToCart(userId, prodId, price))
        }
    }
}

const SingleProductContainer = connect(mapState, mapDispatch)(SingleProduct)

export default SingleProductContainer
