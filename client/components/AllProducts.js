import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../store/allProducts'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import CategoryDropDown from './Categories'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
}

/**
 * COMPONENT
 */

class allProducts extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadProducts()
  }
  
  render() {
    console.log(this.props.allProducts)
    return (
      <div id="all-products" style={styles.root}>
        <CategoryDropDown />
        <GridList cellHeight={180} style={styles.gridList}>
          <Subheader>Product List</Subheader>
          {this.props.allProducts.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} >
              <GridTile
                title={product.title}
                //subtitle={<span>by <b>{tile.author}</b></span>}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              >
                <img src={product.imageUrl}/>
              </GridTile>
            </Link>
          ))}
        </GridList>
      </div>
    )
  }
}

function mapStateToProps(store) {
  console.log(store)
  return {
    allProducts: store.allProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProducts: function () {
      let query = this.location?this.location.search:undefined;
      dispatch(fetchProducts(query))  
    }
  };
}

const allProductsContainer = connect(mapStateToProps, mapDispatchToProps)(allProducts);
export default allProductsContainer;
