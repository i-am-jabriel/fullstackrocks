import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem';
import { withRouter } from 'react-router-dom'
import { login, signup } from '../store/currentUser'

const styles = {
    customWidth: {
        width: 200,
    },
};


const LoginForm = (props) => {
    const actions = [
        <FlatButton
            label="Log In"
            primary={false}
            keyboardFocused={false}
            key=''
            onClick={props.handleLogin} />,
        <FlatButton
            label="Cancel"
            primary={false}
            onClick={props.handleClose} key='1' />

    ];
    return (
        <form method='POST' >
            <TextField name="email" floatingLabelText="Email" style={{ margin: 5 }} value={props.formProps.email} onChange={props.handleChange} />
            <TextField name="password" floatingLabelText="Password" style={{ margin: 5 }} value={props.formProps.password} onChange={props.handleChange} />

            <div style={{ textAlign: 'right', padding: 8 }}>
                {actions}
            </div>
        </form>
    )
}



function mapStateToProps(storeState) {
    return {
        currentuser: storeState.currentuser
    }
}
function mapDispactToProps(dispatch, ownProps) {

    return {
        handleLogin(event) {
            event.preventDefault()
            dispatch(login({
                email: ownProps.formProps.email,
                password: ownProps.formProps.password
            }))
        }
    }
}

const LoginFormContainer = connect(mapStateToProps, mapDispactToProps)(LoginForm);





export default LoginFormContainer;