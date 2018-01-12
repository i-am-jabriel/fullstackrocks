import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


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
    state = {
        logged: true,
    };

    handleChange = (event, logged) => {
        this.setState({ logged: logged });
    };

    render() {
        return (
            <div>
                <AppBar
                    title="FSAROCKS"
                    iconElementRight={this.state.logged ? <Logged /> : <Login />}
                    showMenuIconButton={false}
                />
            </div>
        );
    }
}






// <nav>
//                 {
//                     isLoggedIn
//                         ? <div>
//                             {/* The navbar will show these links after you log in */}
//                             <Link to="/home">Home</Link>
//                             <a href="#" onClick={handleClick}>Logout</a>
//                         </div>
//                         : <div>
//                             {/* The navbar will show these links before you log in */}
//                             <Link to="/login">Login</Link>
//                             <Link to="/signup">Sign Up</Link>
//                         </div>
//                 }
//             </nav>

export default NavBar