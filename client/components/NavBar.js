import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { fetchAllCategories } from '../store/categories'
import CategoryDropDown from './Categories'
import { NavLink } from 'react-router-dom'


/**
 * COMPONENT
 */
class Login extends Component {
    static muiName = 'FlatButton';



    render() {
        return (
            <FlatButton {...this.props} label="Login" />
        );
    }
}


const Logged = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
        <MenuItem primaryText="Home" />
        <MenuItem primaryText="Cart" />
        <MenuItem primaryText="Sign out" />
    </IconMenu>
);

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: true,
        };
    }


    componentDidMount() {
        this.props.loadCategories()
    }

    handleChange = (event, logged) => {
        this.setState({ logged: logged });
    };

    render() {
        return (
            <div>
                <AppBar
                    showMenuIconButton={false}
                >
                    <NavLink to={`/`}><h1>FSAROCKS</h1></NavLink>
                    <CategoryDropDown categories={this.props.categories} />
                    {
                        this.state.logged ? <Logged /> : <Login />
                    }
                </AppBar>
            </div>
        );
    }
}

function mapStateToProps(storeState) {
    return {
        categories: storeState.categories
    }
}
function mapDispactToProps(dispatch, ownProps) {
    return {
        loadCategories: () => {
            dispatch(fetchAllCategories())
        }
    }
}

const NavBarContainer = connect(mapStateToProps, mapDispactToProps)(NavBar)

export default NavBarContainer