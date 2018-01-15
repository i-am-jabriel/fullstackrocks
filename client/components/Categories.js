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
    }

    handleChange = (event, index, value) => this.props.getCategoryValue(value);

    render() {
        return (
            <div>
                <DropDownMenu value={this.props.categoryVal} onChange={this.handleChange}>
                    <MenuItem key={0} value={1} primaryText='Categories' />
                    {
                        this.props.categories.map(category =>
                            (
                                <MenuItem key={category.id} value={category.id + 1} primaryText={category.name} />
                            ))
                    }
                </DropDownMenu>
                <br />
            </div>
        );
    }
}