import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchActiveUserOrder} from '../store/activeOrder'

class CartView extends Component {
    componentDidMount() {
        this.props.loadUserOrder(this.props.match.params.userId)
    }

    render() {
        const order = this.props.activeOrder
        return (
            <div>
                <ul>
                {order.length && order[0].products.map(product => (
                    <li key={product.id}>
                    <Link to={`/products/${product.id}`}>{product.title}
                    <span>{product.image}</span>
                    </Link>
                    <span>{product.order_products.quantity}</span>
                    <span>{product.showPrice}</span>
                    </li>

                )
                )}
                </ul>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        activeOrder: state.activeOrder
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadUserOrder: function(userId) {
            dispatch(fetchActiveUserOrder(userId))
        }
    }
}

const CartContainer = connect(mapState, mapDispatch)(CartView)

export default CartContainer
