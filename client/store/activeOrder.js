import axios from 'axios';

const GET_ACTIVE_ORDER = 'GET_ACTIVE_ORDER'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const CHANGE_PRODUCT_QUANTITY = 'CHANGE_PRODUCT_QUANTITY'

export const getActiveOrder = (activeOrder) => {
    return { type: GET_ACTIVE_ORDER, activeOrder }
}

export const removeProduct = (productId) => {
    return { type: REMOVE_PRODUCT, productId }
}

export const changeQuantity = (product) => {
    return { type: CHANGE_PRODUCT_QUANTITY, product }
}

export const fetchActiveUserOrder = (userId) => {
    return dispatch => {
        axios.get(`/api/users/${userId}/cart`)
            .then(res => dispatch(getActiveOrder(res.data)))
    }
}

export const changeProductQuantity = (quantity, orderId, prodId, userId) => {
    return dispatch => {
        axios.put(`/api/users/${userId}/cart`, { quantity, orderId, prodId })
            .then(res => dispatch(changeQuantity(res.data)))
    }
}

export const removeCurrentItem = (prodId, orderId, userId) => {
    return (dispatch) => {
        axios.delete(`/api/users/${userId}/cart`, { data: { prodId, orderId } })
            .then(() => dispatch(removeProduct(prodId)))
            .catch(console.error)
    }
}

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ACTIVE_ORDER:
            return action.activeOrder
        case REMOVE_PRODUCT:
            const deletedProduct = remove(state, action.productId)
            return Object.assign({}, state, {
                products: deletedProduct
            })
        case CHANGE_PRODUCT_QUANTITY:
            return action.product
        default:
            return state
    }
}

// function remove (order, prodId) {
//     const updatedList = order.products.filter(product => {
//         if (product.id !== prodId) return product
//     })
//     order.products = updatedList
//     return order
// }

function remove(order, prodId) {
    return order.products.filter(product => {
        // return product.id !== prodId
        if (product.id !== prodId) return product
    })
}

function update(order, updatedProduct) {
    console.log(updatedProduct)
    return order.products.map(product => {
        if (product.id === updatedProduct.productId) return updatedProduct
        else return product
    })
}