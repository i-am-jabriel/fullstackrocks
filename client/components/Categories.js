import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { NavLink, Redirect } from 'react-router-dom';
import { fetchProducts } from '../store/allProducts';
import { fetchAllCategories } from '../store/categories'; 
import { connect } from 'react-redux';



const styles = {
    customWidth: {
        width: 200,
    },
};

class CategoryDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect:null
        }
    }
    componentDidMount(){
        this.props.loadCategories()
    }

    handleChange = (event, index, value) => {
        //location.hash=;
        let query=undefined
        if(value!=='Categories')query='?category='+value
        this.setState({redirect:'/products'+query})
        this.props.loadProducts(query)
    }

    render() {
        return (
            <div>
                <DropDownMenu value={'Categories'} onChange={this.handleChange}>
                    <MenuItem value={'Categories'} primaryText='Categories' />
                    {
                        this.props.categories && this.props.categories.map(category =>
                            (
                                <MenuItem key={category.id} value={category.name} primaryText={category.name} />
                            ))
                    }
                </DropDownMenu>
                <br />
                {
                    //Redirect them if they select a route  
                    this.state.redirect && (<Redirect push to={{pathname:this.state.redirect}} />)
                }
            </div>
        );
    }
}

function mapStateToProps(store) {
    return { 
        categories:store.categories
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        loadCategories: () => {
            dispatch(fetchAllCategories())
        },
        loadProducts: (query) => {
            query = query || (this.location?this.location.search:undefined);
            console.log('query is '+query);
            dispatch(fetchProducts(query))  
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDropDown)