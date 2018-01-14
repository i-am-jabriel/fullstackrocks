import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import allProducts from './allProducts'
import singleProduct from './singleProduct'
import reviews from './productReviews'
import categories from './categories'
import currentUser from './currentUser'
import user from './user'

const reducer = combineReducers({ allProducts, singleProduct, categories, currentUser, reviews })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
