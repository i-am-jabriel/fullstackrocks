import axios from 'axios';

//Action Types
const ALL_PRODUCTS = 'ALL_PRODUCTS';

//Action Creators
const allProducts = (products) => {
    return {
        type: ALL_PRODUCTS,
        products
    };
};

//Thunk Action Creator
export const fetchProducts = () => {
    return function(dispatch) {
        axios.get('/api/products')
        .then(response => {dispatch(allProducts(response.data)); })
        .catch(console.error);
    }
};

export default function (state = [], action) {
    switch (action.type) {

        case ALL_PRODUCTS:
          return action.products

        default:
            return state
    }
}
