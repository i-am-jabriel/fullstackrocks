import axios from 'axios'

const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'

export const gotSingleProduct = (singleProduct) => {
    return {type: GOT_SINGLE_PRODUCT, singleProduct}
}

export const fetchSingleProduct = (productId) => {
    return function(dispatch) {
        axios.get(`/api/products/${productId}`)
        .then(res => res.data)
        .then(foundSingleProduct => dispatch(gotSingleProduct(foundSingleProduct)))
    }
}

const initialState = {
    singleProduct: {}
  }

export default function (state = initialState, action) {
    switch (action.type) {
      case GOT_SINGLE_PRODUCT:
        return action.singleProduct
      default:
        return state
    }
  }
