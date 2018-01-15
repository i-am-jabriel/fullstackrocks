import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import allProducts from './allProducts'
import singleProduct from './singleProduct'
import reviews from './productReviews'
import categories from './categories'
import currentUser from './currentUser'
import activeOrder from './activeOrder'
import orders from './orders'

const reducer = combineReducers({ allProducts, singleProduct, categories, currentUser, reviews, orders, activeOrder })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
))
const store = createStore(reducer, middleware)

export default store

