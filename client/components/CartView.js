import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchActiveUserOrder, removeCurrentItem, changeProductQuantity, checkoutOrder } from '../store/activeOrder'

class CartView extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

        this.props.loadUserOrder(this.props.match.params.userId)

    }

    render() {
        const order = this.props.activeOrder.products
        return (
            <div>
                <ul>
                    {order && order.map(product => (
                        <li key={product.id}>

                            <div>
                                <Link to={`/products/${product.id}`}>{product.title}</Link>
                                {/* <img src={product.imageUrl} /> */}
                            </div>

                            <div>
                                <span>Quantity: {product.order_products.quantity}</span>
                                <button className='increment' onClick={() => this.props.changeQuantity('+', product.order_products.quantity, product.order_products.orderId, product.order_products.productId, this.props.match.params.userId)}> + </button>
                                <button className='decrement' onClick={() => this.props.changeQuantity('-', product.order_products.quantity, product.order_products.orderId, product.order_products.productId, this.props.match.params.userId)}> - </button>
                            </div>changeProductQuantity

                            <div>
                                <span>{product.showPrice}</span>
                            </div>

                            <div>
                                <button onClick={() => (this.props.removeProduct(product.id, order.id, this.props.match.params.userId))}>Remove from Cart</button>
                            </div>
                        </li>

                    )
                    )}
                </ul>
                <button onClick={() => this.props.checkout(this.props.activeOrder.id)}>Checkout</button>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        activeOrder: state.activeOrder
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        loadUserOrder: function (userId) {
            dispatch(fetchActiveUserOrder(userId))
        },
        removeProduct: function (prodId, orderId, userId) {
            dispatch(removeCurrentItem(prodId, orderId, userId))
        },
        changeQuantity: function (incrementer, quantity, orderId, prodId, userId) {
            if (incrementer === '+') {
                ++quantity
                dispatch(changeProductQuantity(quantity, orderId, prodId, userId))
            } else {
                --quantity
                dispatch(changeProductQuantity(quantity, orderId, prodId, userId))
            }
        },
        checkout: function (orderId) {
            dispatch(checkoutOrder(orderId, ownProps.history))
        }
    }
}

const CartContainer = connect(mapState, mapDispatch)(CartView)

export default CartContainer
