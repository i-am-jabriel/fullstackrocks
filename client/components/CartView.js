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

                        <div>
                            <Link to={`/products/${product.id}`}>{product.title}</Link>
                            <img src={product.imageUrl} />
                        </div>

                        <div>
                            <button>
                            <span>Quantity: {product.order_products.quantity}</span>
                            </button>
                        </div>

                        <div>
                            <span>{product.showPrice}</span>
                        </div>

                        <div>
                            <button>Remove from Cart</button>
                        </div>
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
