import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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