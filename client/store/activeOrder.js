import axios from 'axios';

const GET_ACTIVE_ORDER = 'GET_ACTIVE_ORDER'

export const getActiveOrder = (activeOrder) => {
    return {type: GET_ACTIVE_ORDER, activeOrder}
}

export const fetchActiveUserOrder = (userId) => {
    return dispatch => {
        axios.get(`/api/users/${userId}/cart`)
        .then(res => res.data)
        .then(activeOrder => dispatch(getActiveOrder(activeOrder)))
    }
}

const initialState = []

export default (state = initialState, action) => {
    switch (action.type){
        case GET_ACTIVE_ORDER:
            return action.activeOrder
        default:
            return state
    }
}