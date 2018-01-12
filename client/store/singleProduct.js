import axios from 'axios'

const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'
const GOT_ALL_PRODUCT_REVIEWS = 'GOT_ALL_PRODUCT_REVIEWS'

export const gotSingleProduct = (singleProduct) => {
    return {type: GOT_SINGLE_PRODUCT, singleProduct}
}

export const gotAllProductReviews = (reviews) => {
    return {type: GOT_ALL_PRODUCT_REVIEWS, reviews}
}

export const fetchSingleProduct = (productId) => {
    return function(dispatch) {
        axios.get(`/api/products/${productId}`)
        .then(res => res.data)
        .then(foundSingleProduct => dispatch(gotSingleProduct(foundSingleProduct)))
        .catch(console.error)
    }
}

export const fetchProductReviews = (productId) => {
    return function(dispatch) {
        axios.get(`/api/products/${productId}/reviews`)
        .then(res => res.data)
        .then(allProductReviews => dispatch( gotAllProductReviews(allProductReviews)))
        .catch(console.error)
    }
}

const initialState = {
    singleProduct: {}
    // reviews: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GOT_SINGLE_PRODUCT:
            // return Object.assign({}, state, {singleProduct: action.singleProduct});
            return action.singleProduct
        // case GOT_ALL_PRODUCT_REVIEWS:
        //     return Object.assign({}, state, {reviews: action.reviews})
        default:
            return state
    }
  }
