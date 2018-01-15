import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../store/allProducts'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Categories from './Categories'
import categories from '../store/categories';
import { fetchAllCategories } from '../store/categories'

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
    this.state = {
      categoryVal: 0
    }
    this.getCategoryValue = this.getCategoryValue.bind(this);
  }

  getCategoryValue(categoryVal) {
    this.setState({ categoryVal })
  }

  componentDidMount() {
    this.props.loadProducts()
    this.props.loadCategories()
  }

  render() {
    console.log(this.state.categoryVal)
    return (
      <div id="all-products" style={styles.root}>
        <Categories categories={this.props.categories} categoryVal={this.state.categoryVal} getCategoryValue={this.getCategoryValue} />
        <GridList cellHeight={180} style={styles.gridList}>
          <Subheader>Product List</Subheader>
          {this.props.allProducts.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} >
              <GridTile
                title={product.title}
                //subtitle={<span>by <b>{tile.author}</b></span>}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              >
                <img src={product.imageUrl} />
              </GridTile>
            </Link>
          ))}
        </GridList>
      </div>
    )
  }
}

function mapStateToProps(storeState) {
  return {
    allProducts: storeState.allProducts,
    categories: storeState.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => {
      dispatch(fetchAllCategories())
    },
    loadProducts: function () {
      dispatch(fetchProducts());
    }
  };
}

const allProductsContainer = connect(mapStateToProps, mapDispatchToProps)(allProducts);
export default allProductsContainer;
