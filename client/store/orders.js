import axios from 'axios';

const GET_ALL_ORDERS = 'GET_ALL_ORDERS';

const GET_USER_ORDER = 'GET_USER_ORDER';

export const setOrders = (orders) => {
    return {type: GET_ALL_ORDERS, orders}
}

export const fetchUserOrders = (uid) => {
    return dispatch => {
        axios.get(`/api/users/${uid}/orders`)
        .then(res => res.data)
        .then(orders => dispatch(setOrders(orders)))
    }
}

export const fetchAllOrders = () => {
    return function(dispatch) {
        axios.get(`/api/orders/`)
        .then(res => res.data)
        .then(orders => dispatch(setOrders(orders)))
    }
}

export default (prevState = [], action) => {
    switch(action.type){
        case GET_ALL_ORDERS:
            action = action.orders;
            break;
    }
}