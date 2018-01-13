import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * COMPONENT
 */
const showCreateProductWindow = () =>{

}
const showCreateCategoryWindow = (id) => {
    
}
const showEditFieldWindow = (fieldName, initalValue) => {

}
const Home = (props) => {
    return (
        <div id='admin-view'>
            <h3>Admin Management</h3><hr />
            <Tabs>
                <Tab
                icon={<FontIcon className="material-icons">shop</FontIcon>}
                label="Product Management">
                    <RaisedButton label="Create Product" onClick={showCreateProductWindow} /> 
                    <RaisedButton label='Create Category' onClick={showCreateCategoryWindow}/>
                    <Table fixedHeader={true} showRowHover={true} selectable={false}>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Desc</TableHeaderColumn>
                                <TableHeaderColumn>Quantity</TableHeaderColumn>
                                <TableHeaderColumn>Price</TableHeaderColumn>
                                <TableHeaderColumn>ImageUrl</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Tab>
                <Tab
                icon={<FontIcon className="material-icons">query_builder</FontIcon>}
                label="Order Management">
                </Tab>
                <Tab
                icon={<FontIcon className="material-icons">perm_identity</FontIcon>}
                label="User Management">
                </Tab>
            </Tabs>
        </div>
    )
}

//let tempProducts = 
export default Home