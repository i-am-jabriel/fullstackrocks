import axios from 'axios'
import socket from '../socket'

const GOT_ALL_PRODUCT_REVIEWS = 'GOT_ALL_PRODUCT_REVIEWS'
const WRITE_REVIEW = 'WRITE_REVIEW'


export const gotAllProductReviews = (reviews) => {
  return {type: GOT_ALL_PRODUCT_REVIEWS, reviews}
}

export function writeReview (review) {
  const action = { type: WRITE_REVIEW, review };
  return action;
}

export const fetchProductReviews = (productId) => {
  return function(dispatch) {
      axios.get(`/api/products/${productId}/reviews`)
      .then(res => res.data)
      .then(allProductReviews => dispatch( gotAllProductReviews(allProductReviews)))
      .catch(console.error)
  }
}

export function postReview (review, productId, history, user) {

    return function thunk (dispatch) {
      return axios.post(`/api/products/${productId}/review`, review)
        .then(res => res.data)
        .then(newReview => {
          const action = writeReview(newReview);
          action.review.user = user
          dispatch(action);
          socket.emit('new-review', newReview);
        })
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
    case WRITE_REVIEW:
      return state.concat([action.review])
    default:
      return state
  }
}
