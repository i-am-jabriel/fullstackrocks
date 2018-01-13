import axios from 'axios'



const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'


export const getCategories = (categories) => {
    return {
        type: GET_ALL_CATEGORIES,
        categories
    }
}


export const fetchAllCategories = () => {
    return dispatch => {
        axios.get('/api/categories')
            .then(res => dispatch(getCategories(res.data)))
            .catch(console.error)
    }
}


const categoriesReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return action.categories
        default:
            return state;
    }
}

export default categoriesReducer;