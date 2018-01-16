import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchActiveUserOrder, removeCurrentItem} from '../store/activeOrder'

class CartView extends Component {
    // constructor(props) {
    //     super(props)
    //     this.handleRemove = this.handleRemove.bind(this)
    // }
    componentDidMount() {
        this.props.loadUserOrder(this.props.match.params.userId)
    }

    render() {
        const order = this.props.activeOrder
        console.log(order.id)
        return (
            <div>
                <ul>
                {order.products && order.products.map(product => (
                    <li key={product.id}>

                        <div>
                            <Link to={`/products/${product.id}`}>{product.title}</Link>
                            {/* <img src={product.imageUrl} /> */}
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
                            <button onClick={() => (this.props.removeProduct(product.id, order.id, this.props.match.params.userId))}>Remove from Cart</button>
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
        },
        removeProduct: function(prodId, orderId, userId) {
            dispatch(removeCurrentItem(prodId, orderId, userId))
        }
    }
}

const CartContainer = connect(mapState, mapDispatch)(CartView)

export default CartContainer
