import axios from 'axios'


//action types
const SET_CURRENT_USER = 'SET_CURRENT_USER'
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'


//action creators

const setCurrentUser = user => ({ type: SET_CURRENT_USER, user })
const removeCurrentUser = () => ({ type: REMOVE_CURRENT_USER })

//thunk creators

export const login = (credentials) => dispatch => {
    axios.post('/api/auth/login', credentials)
        .then(res => dispatch(setCurrentUser(res.data)))
}

export const signup = (credentials) => dispatch => {
    axios.post('/api/auth/signup', credentials)
    // .then(res => dispatch(setCurrentUser(res.data)))
}

export const fetchCurrentUser = () => dispatch => {
    axios.get('/api/auth/me')
        .then(res => dispatch(setCurrentUser(res.data)))
}

export const logout = () => dispatch => {
    axios.post('/api/auth/logout')
        .then(() => dispatch(removeCurrentUser()))
}

//reducer
export default function reducer(currentUser = {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.user
        case REMOVE_CURRENT_USER:
            return {}
        default:
            return currentUser;
    }
}