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
    console.log(props);
    const actions = [
        <FlatButton
            label="Cancel"
            primary={false}
            onClick={props.handleClose} key='1' />,
        <FlatButton
            label="Login"
            primary={false}
            keyboardFocused={false}
            type='submit'
            key='2'
            onClick={props.handleLogin} />,
        <FlatButton
            label="Sign Up"
            primary={false}
            keyboardFocused={false}
            key=''
            onClick={props.handleSignUp} />
    ];
    return (
        <form method='POST' >
            <TextField name="email" floatingLabelText="Email" style={{ margin: 5 }} value={props.formProps.email} onChange={props.handleChange} />
            <TextField name="password" floatingLabelText="Password" style={{ margin: 5 }} value={props.formProps.password} onChange={props.handleChange} />
            <TextField name="name" floatingLabelText="Name" style={{ margin: 5 }} value={props.formProps.name} onChange={props.handleChange} />
            <TextField name="phone" floatingLabelText="Phone Number" style={{ margin: 5 }} value={props.formProps.phone} onChange={props.handleChange} />
            <TextField name="street" floatingLabelText="Street Address" style={{ margin: 5 }} value={props.formProps.street} onChange={props.handleChange} />
            <TextField name="city" floatingLabelText="City" style={{ margin: 5 }} value={props.formProps.city} onChange={props.handleChange} />
            <TextField name="state" floatingLabelText="State" style={{ margin: 5 }} value={props.formProps.state} onChange={props.handleChange} />
            <TextField name="zip" floatingLabelText="Zip Code" style={{ margin: 5 }} value={props.formProps.zip} onChange={props.handleChange} />
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
    const formValues = {
        email: ownProps.formProps.email,
        password: ownProps.formProps.password,
        name: ownProps.formProps.name,
        phone: ownProps.formProps.phone,
        street: ownProps.formProps.street,
        city: ownProps.formProps.city,
        state: ownProps.formProps.state,
        zip: ownProps.formProps.zip
    }
    return {
        handleLogin(event) {
            event.preventDefault()
            dispatch(login(formValues))
        },
        handleSignUp(event) {
            event.preventDefault()
            dispatch(signup(formValues))
        }
    }
}

const LoginFormContainer = connect(mapStateToProps, mapDispactToProps)(LoginForm);





export default LoginFormContainer;