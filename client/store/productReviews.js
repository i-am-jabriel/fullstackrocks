import axios from 'axios'

const GOT_ALL_PRODUCT_REVIEWS = 'GOT_ALL_PRODUCT_REVIEWS'

export const gotAllProductReviews = (reviews) => {
  return {type: GOT_ALL_PRODUCT_REVIEWS, reviews}
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
  reviews: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCT_REVIEWS:
      return action.reviews
    default:
      return state
  }
}
