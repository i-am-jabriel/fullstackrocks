import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
import SignUpForm from './SignUpForm'
import AddPerson from 'material-ui/svg-icons/social/person-add'



class SignUpFormContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            email: '',
            password: '',
            name: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            zip: ''
        };
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        event.preventDefault()
        let change = {}
        change[event.target.name] = event.target.value
        this.setState(change)
    }


    render() {
        return (
            <div>
                <IconButton onClick={this.handleOpen} tooltip='Sign Up'>
                    <AddPerson />
                </IconButton>
                <Dialog
                    title="Sign Up"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    titleStyle={{ textAlign: "center" }}
                >
                    <SignUpForm handleClose={this.handleClose} formProps={this.state} handleChange={this.handleChange} />
                </Dialog>
            </div>
        );
    }
}

export default SignUpFormContainer;