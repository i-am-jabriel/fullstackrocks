import axios from 'axios'
import history from '../history'

//initial state
const defaultUser = {}


//action types
const SET_CURRENT_USER = 'SET_CURRENT_USER'
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'


//action creators

const setCurrentUser = user => ({ type: SET_CURRENT_USER, user })
const removeCurrentUser = () => ({ type: REMOVE_CURRENT_USER })

//thunk creators

export const login = (credentials) => dispatch => {
    axios.post('/auth/login', credentials)
        .then(res => {
            dispatch(setCurrentUser(res.data))
            history.push('/')
        })
        .catch(err => console.log(err))
}

export const signup = (credentials) => dispatch => {
    axios.post('/auth/signup', credentials)
        .then(res => {
            dispatch(setCurrentUser(res.data))
            history.push('/')
        })
        .catch(err => console.log(err))
}

export const fetchCurrentUser = () => dispatch => {
    axios.get('/auth/me')
        .then(res => {
            dispatch(setCurrentUser(res.data || defaultUser))
        })
        .catch(err => console.log(err))
}

export const logout = () => dispatch => {
    axios.post('/auth/logout')
        .then(() => {
            dispatch(removeCurrentUser())
            history.push('/')
        })
        .catch(err => console.log(err))
}

//reducer
export default function reducer(state = defaultUser, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.user
        case REMOVE_CURRENT_USER:
            return defaultUser
        default:
            return state;
    }
}