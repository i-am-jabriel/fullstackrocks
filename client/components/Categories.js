import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { NavLink } from 'react-router-dom'

const styles = {
    customWidth: {
        width: 200,
    },
};

export default class CategoryDropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: 1 };
    }

    handleChange = (event, index, value) => this.setState({ value });

    render() {
        return (
            <div>
                <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                    <NavLink to='/products'><MenuItem key={0} value={1} primaryText='Categories' /></NavLink>
                    {
                        this.props.categories.map(category =>
                            (
                                <NavLink to='/products'><MenuItem key={category.id} value={category.id + 1} primaryText={category.name} /></NavLink>
                            ))
                    }
                </DropDownMenu>
                <br />
            </div>
        );
    }
}