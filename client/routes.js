import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, Login, Signup, UserProfile } from './components'
import Home from './components/Home'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import NavBar from './components/NavBar'
import SingleUser from './components/SingleUser'
import { fetchCurrentUser } from './store/currentUser'
import CartView from './components/CartView'

import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:prodId" component={SingleProduct} />


            {
              (isLoggedIn) &&
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route exact path="/users" component={UserProfile} />
                <Route exact path="/users/:userId" component={UserProfile} />
                <Route path="/users/:userId/cart" component={CartView} />
              </Switch>
            }
            {/* Displays our Login component as a fallback */}
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.currentUser.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      console.log('in dispatch')
      dispatch(fetchCurrentUser())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
