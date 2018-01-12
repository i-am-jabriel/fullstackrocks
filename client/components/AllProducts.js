import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/allProducts'


/**
 * COMPONENT
 */

class allProducts extends Component {

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    return (
      <div id="all-products">
          <ul>
          {this.props.allProducts.map( product => (
              <div className="col-xs-4" key={product.id}>
                  <Link to={`/products/${product.id}` } >
                  <img src={product.imageUrl} />
                  <li>{product.title}</li>
                  </Link>
              </div>
          ))}
          </ul>
      </div>
    )
  }

}

function mapStateToProps (storeState) {
  return {
      allProducts: storeState.allProducts
  };
}

function mapDispatchToProps (dispatch) {
  return {
      loadProducts: function(){
          dispatch(fetchProducts());
      }
  };
}

const allProductsContainer = connect(mapStateToProps, mapDispatchToProps)(allProducts);
export default allProductsContainer;
