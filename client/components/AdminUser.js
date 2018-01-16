import React from 'react';
import axios from 'axios';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn as TRC,
  } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import Chip from 'material-ui/Chip';    
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import {fetchProducts} from '../store/allProducts';
import {fetchAllCategories} from '../store/categories';
import {fetchAllOrders} from '../store/orders';
import { connect } from 'react-redux';

const productFieldNames = ['title','description','price','quantity','imageUrl'];
/* Helper Functions */
const concat = (str,len=20) =>{
    if(str.length<=len)return str
    return str.substring(0,len-3)+'...'
}
function getCategoryArrayFromProduct(obj){
    let categories = obj.categories || []
    return categories.map(cat=>cat.name)
}
function subtractArrays(a, b){
    return a.filter(i=>b.indexOf(i)<0)
}
/**
 * COMPONENT
 */

class AdminUser extends React.Component{
    constructor(props){
        super(props)
        this.state={
            createCategoryWindow:false,
            createProductWindow:false,
            editCategoriesWindow:false,
            editFieldWindow:false,
            showSnackBar:false,
            window:{},
            users:[],
            refresh:0, //A variable to help force page refreshs
        }

        //Make is so that if you press enter its the same as pressing the submit button
        document.onkeydown = evt =>{
            if(this.state.window.type && evt.keyCode === 13)this.handleDialogClose(true)
            return true;
        }
        this.showCreateCategoryWindow=this.showCreateCategoryWindow.bind(this);
        this.showCreateProductWindow=this.showCreateProductWindow.bind(this);
        this.showEditCategoriesWindow=this.showEditCategoriesWindow.bind(this);
        this.showEditFieldWindow=this.showEditFieldWindow.bind(this);
        this.handleDialogClose=this.handleDialogClose.bind(this);
        this.addCategoryToProduct=this.addCategoryToProduct.bind(this);
        this.removeCategoryFromProduct=this.removeCategoryFromProduct.bind(this);

        //Config the buttons in the admin popup windows [dialogs]
        this.dialogActions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={()=>{this.handleDialogClose()}}
            />,
            <FlatButton
              label="Submit"
              primary={true /*keyboardFocused={true}*/ }
              onClick={()=>{this.handleDialogClose(true)}}
            />,
        ]
    }
    loadUsers(){
        axios.get('/api/users/')
            .then(res=>res.data)
            .then(users=>this.setState({users}))
    }
    componentDidMount(){
        this.props.loadProducts();
        this.props.loadCategories();
        this.props.loadOrders();
        this.loadUsers();
    }
    showCreateProductWindow(){
        this.setState({
            createCategoryWindow:false,
            createProductWindow:true,
            editCategoriesWindow:false,
            editFieldWindow:false,
            window:{type:'create product'}
        })
    }
    showCreateCategoryWindow(){
        this.setState({
            createCategoryWindow:true,
            createProductWindow:false,
            editCategoriesWindow:false,
            editFieldWindow:false,
            window:{type:'create category'}
        })
    }
    showEditCategoriesWindow(id,initialValue){
        this.setState({
            createCategoryWindow:false,
            createProductWindow:false,
            editCategoriesWindow:true,
            editFieldWindow:false,
            window:{
                type:'edit categories',
                id,
                value:initialValue,
            }
        })
    }
                        //route, id in database, name of field editing,initial value
    showEditFieldWindow(type, id, fieldName, initialValue){
        this.setState({
            createCategoryWindow:false,
            createProductWindow:false,
            editCategoriesWindow:false,
            editFieldWindow:true,
            window:{
                id,
                type,
                fieldName,
                initialValue,

            }
        })
    }
    handleDialogClose(save=false){
        const {id,type,fieldName} = this.state.window
        //create the data to send to the api routes
        const data={}
        switch(type){
            case 'products':
                data[fieldName]=$('#edit-data-field')[0].value
                //if(fieldName==='price')data[fieldName]*=100
                break
            case 'create category':
                data['name']=$('#add-category-field')[0].value
                break
            case 'create product':
                productFieldNames.forEach(field=>{
                    data[field]=$('#create-product-input-'+field)[0].value
                    //if(field==='price')data[field]*=100
                })
                break
        }
        //Kill all windows and relevant data
        this.setState({
            createCategoryWindow:false,
            createProductWindow:false,
            editCategoriesWindow:false,
            editFieldWindow:false,
            window:{},
        })
        //Only send the data if the user submits it
        if(!save)return
        this.setState({showSnackBar:true})
        switch(type){
            case 'products':
                axios.put('/api/'+type+'/'+id,data)
                    .then(res=>res.data)
                    .then(res=>this.props.loadProducts())
                break
            case 'create category':
                axios.post('/api/categories',data)
                    .then(res=>res.data)
                    .then(res=>this.props.loadCategories())
                break
            case 'create product':
                axios.post('/api/products',data)
                    .then(res=>res.data)
                    .then(res=>this.props.loadProducts())
                break
        }
    }
    makeUserAdmin(id){
        axios.put('/api/users/'+id,{isAdmin:true})
            .then(res=>res.data)
            .then(data=>this.updateUserWithData(id,data))
    }
    forceUserPasswordReset(id){
        axios.put('/api/users/'+id,{forcePasswordReset:true})
            .then(res=>res.data)
            .then(data=>this.updateUserWithData(id,data))
    }
    deleteUser(id){
        axios.delete('/api/users/'+id)
            .then(res=>res.data)
            .then(data=>{
                let users = this.state.users.slice(0).filter(user=>user.id!==id)
                this.setState({users,showSnackBar:true})
            })
    }
    toggleOrderDetails(toggledIndex) {
        let listOfOrders = Array.from(document.getElementsByClassName('admin-order-details'))
        listOfOrders.forEach((elem, i) => {
          if (i === toggledIndex) return;
          $(elem).removeClass('active')
        })
        $(listOfOrders[toggledIndex]).toggleClass('active')
      }
    updateUserWithData(id,data){
        let users = this.state.users.slice(0);
        users.forEach((user,i)=>{
            if(user.id===id)users[i]=data
        })
        this.setState({users,showSnackBar:true})
    }
    updateProductWithData(id,data){
        this.props.products.forEach((product,i)=>{
            if(product.id===id)this.props.products[i]=data;
        })
    }
    removeCategoryFromProduct(category){
        let value = this.state.window.value.filter(item=>item!==category)
        let window = Object.assign({},this.state.window,{value})
        let data = {
            category,
            action:'remove'
        }
        axios.put('/api/products/'+window.id,data)
            .then(res=>res.data)
            .then(product=>{
                this.updateProductWithData(id,product)
                this.setState({window,refresh:Math.random()})
            })
            .catch(console.error)
    }
    addCategoryToProduct(event, index, category){
        let value = this.state.window.value.slice(0)
        value.push(category)
        let window = Object.assign({},this.state.window,{value})
        let data = {
            category,
            action:'add'
        }
        axios.put('/api/products/'+window.id,data)
            .then(res=>res.data)
            .then(product=>{
                this.updateProductWithData(window.id,product)
                this.setState({window,refresh:Math.random()})
            })
            .catch(console.error)
    }
    render(){
        let products = this.props.products || []
        let orders = this.props.orders || []
        let users = this.state.users || []
        let allCategories = this.props.categories || []
        //If we're editing a products category dialog map what tags are available to be added
        let productCategories = [], remainingCategories = []
        if(this.state.window.type === 'edit categories'){
            productCategories = this.state.window.value || [];
            remainingCategories = subtractArrays(getCategoryArrayFromProduct({categories:allCategories}),productCategories)
        }
        return (
            <div id='admin-view'>
                {
                //Snackbar
                }
                <Snackbar
                    open={this.state.showSnackBar}
                    message="Success!"
                    autoHideDuration={2000}
                />
                {
                //Dialogs
                }
                <h3 className='force-refresh'>{this.state.refresh}</h3>
                <Dialog
                    className='admin-dialog'
                    title="Edit Data Field"
                    actions={this.dialogActions}
                    modal={false}
                    open={this.state.editFieldWindow}
                    onRequestClose={this.handleDialogClose}
                >
                    <TextField
                        floatingLabelText={this.state.window.fieldName}
                        floatingLabelFixed={true}
                        defaultValue={this.state.window.initialValue}
                        className='full-width-input'
                        id='edit-data-field'
                    />
                </Dialog>

                {
                    //TODO:
                    //VALIDATE THIS DATA ON THE FRONT END
                    //I'm just too lazy rn tbh
                    //Also this is where the key error is coming from but i have no idea why
                }
                <Dialog
                    className='admin-dialog'
                    title="Add Product"
                    actions={this.dialogActions}
                    modal={false}
                    open={this.state.createProductWindow}
                    onRequestClose={this.handleDialogClose}
                >
                    {
                        // because clearly i set the key here TODO: FIX
                        productFieldNames.map((field,i)=>{
                            return [(
                                <TextField
                                    key={'textfield-'+field+i}
                                    floatingLabelText={field}
                                    floatingLabelFixed={true}
                                    className='full-width-input'
                                    id={'create-product-input-'+field}
                                />),(
                                    <br />
                    )]})}
                </Dialog>

                <Dialog
                    className='admin-dialog'
                    title="Add Category"
                    actions={this.dialogActions}
                    modal={false}
                    open={this.state.createCategoryWindow}
                    onRequestClose={this.handleDialogClose}
                >
                    <TextField
                        floatingLabelText='New Category'
                        floatingLabelFixed={true}
                        className='full-width-input'
                        id='add-category-field'
                    />
                </Dialog>

                <Dialog
                    className='admin-dialog'
                    title="Edit Categories"
                    actions={this.dialogActions}
                    modal={false}
                    open={this.state.editCategoriesWindow}
                    onRequestClose={this.handleDialogClose}
                >
                    {
                        productCategories.map((category,i)=>{
                            return (
                                <Chip
                                    key={'chip-category'+i}
                                    onRequestDelete={() => this.removeCategoryFromProduct(category)}
                                >
                                    {category}
                                </Chip>
                    )})}
                    <DropDownMenu
                        onChange={this.addCategoryToProduct}
                        autoWidth={false}
                        value={remainingCategories.length?remainingCategories[0]:''}
                    >
                    {
                        remainingCategories.map((category,i)=>{
                            return (
                                <MenuItem key={'drop-down-category'+i} value={category} primaryText={category} />
                    )})}
                    </DropDownMenu>
                </Dialog>

                {
                //Actual JSX
                }


                <h3>Admin Management</h3><hr />
                <Tabs className='admin-view-container'>
                    <Tab
                    icon={<FontIcon className="material-icons">shop</FontIcon>}
                    label="Product Management">
                        <RaisedButton label="Create Product" onClick={this.showCreateProductWindow} />
                        <br />
                        <RaisedButton label='Create Category' onClick={this.showCreateCategoryWindow}/>
                        <br />
                        <Table fixedHeader={true} showRowHover={true} selectable={false} id='admin-product-table' className='admin-table'>
                            <TableHeader displaySelectAll={false} >
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Desc</TableHeaderColumn>
                                    <TableHeaderColumn>Quantity</TableHeaderColumn>
                                    <TableHeaderColumn>Price</TableHeaderColumn>
                                    <TableHeaderColumn>Image Url</TableHeaderColumn>
                                    <TableHeaderColumn>Edit Catagories</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {products.map(product=>{
                                    return (
                                        <TableRow key={product.id}>
                                            <TRC>{product.id}</TRC>
                                            <TRC className='clickable'>
                                                <span onClick={()=>this.showEditFieldWindow('products',product.id,'title',product.title,product)}>{product.title}</span>
                                            </TRC>
                                            <TRC className='clickable'>
                                                <span onClick={()=>this.showEditFieldWindow('products',product.id,'description',product.description,product)}>{concat(product.description)}</span>
                                            </TRC>
                                            <TRC className='clickable'>
                                                <span onClick={()=>this.showEditFieldWindow('products',product.id,'quantity',product.quantity,product)}>{product.quantity}</span>
                                            </TRC>
                                            <TRC className='clickable'>
                                                <span onClick={()=>this.showEditFieldWindow('products',product.id,'price',product.showPrice,product)}>${product.showPrice}</span>
                                            </TRC>
                                            <TRC className='clickable'>
                                                <span onClick={()=>this.showEditFieldWindow('products',product.id,'imageUrl',product.imageUrl,product)}>{concat(product.imageUrl)}</span>
                                            </TRC>
                                            <TRC>
                                                <RaisedButton label='Edit Categories' onClick={()=>this.showEditCategoriesWindow(product.id,getCategoryArrayFromProduct(product))}/>
                                            </TRC>
                                        </TableRow>
                                )})}
                            </TableBody>
                        </Table>
                    </Tab>
                    <Tab
                    icon={<FontIcon className="material-icons">query_builder</FontIcon>}
                    label="Order Management">
                        <Table fixedHeader={true} showRowHover={true} selectable={false} id='admin-product-table' className='admin-table'>
                            <TableHeader displaySelectAll={false} >
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Status</TableHeaderColumn>
                                    <TableHeaderColumn>Order Date</TableHeaderColumn>
                                    <TableHeaderColumn>Shipped Date</TableHeaderColumn>
                                    <TableHeaderColumn>Total</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} className='clickable'>
                                {orders.map((order,i)=>{
                                    return [
                                        (<TableRow key={'single-order'+order.id}>
                                            <TRC><span onClick={()=>{this.toggleOrderDetails(i)}}>{order.id}</span></TRC>
                                            <TRC><span onClick={()=>{this.toggleOrderDetails(i)}}>{order.status}</span></TRC>
                                            <TRC><span onClick={()=>{this.toggleOrderDetails(i)}}>{order.createdAt}</span></TRC>
                                            <TRC><span onClick={()=>{this.toggleOrderDetails(i)}}>{order.shipDate ? order.shipDate : `Not Shipped Yet`}</span></TRC>
                                            <TRC><span onClick={()=>{this.toggleOrderDetails(i)}}>${order.total/100}</span></TRC>
                                        </TableRow>
                                    ),(
                                        <TableRow key={'order-details'+order.id}>
                                            <TRC colSpan='5'>
                                                <div className='admin-order-details'><Table>
                                                    <TableHeader displaySelectAll={false}><TableRow>
                                                        <TableHeaderColumn>Item #</TableHeaderColumn>
                                                        <TableHeaderColumn>Item Name</TableHeaderColumn>
                                                        <TableHeaderColumn>Purchase Price</TableHeaderColumn>
                                                        <TableHeaderColumn>Quantity</TableHeaderColumn>
                                                        <TableHeaderColumn>Total</TableHeaderColumn>
                                                    </TableRow></TableHeader>
                                                    <TableBody displayRowCheckbox={false}>
                                                        { order.products.map((product,i) => {
                                                            let purchase = product.order_products;
                                                            return (
                                                                <TableRow key={'admin-order-product'+i}>
                                                                    <TRC>{i+1}</TRC>
                                                                    <TRC>{product.title}</TRC>
                                                                    <TRC>${purchase.price /100}</TRC>
                                                                    <TRC>{purchase.quantity}</TRC>
                                                                    <TRC>${purchase.price * purchase.quantity / 100}</TRC>
                                                                </TableRow>
                                                        )})}
                                                    </TableBody>
                                                </Table></div>
                                            </TRC>
                                        </TableRow>
                                    )
                                    ]
                                    
                                })}
                            </TableBody>
                        </Table>
                    </Tab>
                    <Tab
                    icon={<FontIcon className="material-icons">perm_identity</FontIcon>}
                    label="User Management">
                        <Table>
                            <TableHeader displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Email</TableHeaderColumn>
                                    <TableHeaderColumn>Make Admin</TableHeaderColumn>
                                    <TableHeaderColumn>Force Password Reset</TableHeaderColumn>
                                    <TableHeaderColumn>Delete User</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {users.map(user=>{
                                    return (
                                        <TableRow key={user.id+'user-view'}>
                                            <TRC>{user.id}</TRC>
                                            <TRC>{user.email}</TRC>
                                            <TRC><RaisedButton label='Make Admin' onClick={()=>this.makeUserAdmin(user.id)}/></TRC>
                                            <TRC><RaisedButton label='Force Password Reset' onClick={()=>this.forceUserPasswordReset(user.id)} /></TRC>
                                            <TRC><RaisedButton label='Delete User' onClick={()=>this.deleteUser(user.id)} /></TRC>
                                        </TableRow>
                                )})}
                            </TableBody>
                        </Table>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
//let tempProducts = [{"id":1,"title":"Kevin Garnet","description":"Garnets ( /ˈɡɑːrnɪt/) are a group of silicate minerals that have been used since the Bronze Age as gemstones and abrasives.","price":1299,"quantity":10,"imageUrl":"https://static.wixstatic.com/media/6e7517_0b00d9af3f504048902e4077b12a9a0c~mv2_d_2250_3000_s_2.jpeg/v1/fill/w_1196,h_1196,q_85,usm_0.66_1.00_0.01/6e7517_0b00d9af3f504048902e4077b12a9a0c~mv2_d_2250_3000_s_2.jpeg","createdAt":"2018-01-13T19:26:09.525Z","updatedAt":"2018-01-13T19:26:09.525Z","categories":[{"id":1,"name":"Faceted","createdAt":"2018-01-13T19:26:09.523Z","updatedAt":"2018-01-13T19:26:09.523Z","product_catagories":{"createdAt":"2018-01-13T19:26:09.624Z","updatedAt":"2018-01-13T19:26:09.624Z","productId":1,"categoryId":1}},{"id":2,"name":"Rough","createdAt":"2018-01-13T19:26:09.524Z","updatedAt":"2018-01-13T19:26:09.524Z","product_catagories":{"createdAt":"2018-01-13T19:26:09.637Z","updatedAt":"2018-01-13T19:26:09.637Z","productId":1,"categoryId":2}},{"id":4,"name":"Mineral Specimen","createdAt":"2018-01-13T19:26:09.525Z","updatedAt":"2018-01-13T19:26:09.525Z","product_catagories":{"createdAt":"2018-01-13T19:26:09.640Z","updatedAt":"2018-01-13T19:26:09.640Z","productId":1,"categoryId":4}}]},{"id":2,"title":"Amethyst","description":"February Birthstone","price":1501,"quantity":14,"imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Amethyst._Magaliesburg%2C_South_Africa.jpg/1200px-Amethyst._Magaliesburg%2C_South_Africa.jpg","createdAt":"2018-01-13T19:26:09.526Z","updatedAt":"2018-01-13T19:26:09.526Z","categories":[{"id":2,"name":"Rough","createdAt":"2018-01-13T19:26:09.524Z","updatedAt":"2018-01-13T19:26:09.524Z","product_catagories":{"createdAt":"2018-01-13T19:26:09.629Z","updatedAt":"2018-01-13T19:26:09.629Z","productId":2,"categoryId":2}}]},{"id":4,"title":"Pink Star Diamond","description":"The most rare and expensive gem. 59 karats","price":83000000,"quantity":1,"imageUrl":"https://www.ritani.com/wp-content/uploads/2014/11/pink-star-diamond-nbc-news1.jpg","createdAt":"2018-01-13T19:26:09.526Z","updatedAt":"2018-01-13T19:26:09.526Z","categories":[{"id":4,"name":"Mineral Specimen","createdAt":"2018-01-13T19:26:09.525Z","updatedAt":"2018-01-13T19:26:09.525Z","product_catagories":{"createdAt":"2018-01-13T19:26:09.633Z","updatedAt":"2018-01-13T19:26:09.633Z","productId":4,"categoryId":4}}]},{"id":3,"title":"Aquamarine","description":"March Birthstone","price":3025,"quantity":9,"imageUrl":"https://kids.nationalgeographic.com/content/dam/kids/photos/articles/Science/A-G/aquamarine-raw.adapt.945.1.jpg","createdAt":"2018-01-13T19:26:09.526Z","updatedAt":"2018-01-13T19:26:09.526Z","categories":[{"id":3,"name":"Rocks","createdAt":"2018-01-13T19:26:09.525Z","updatedAt":"2018-01-13T19:26:09.525Z","product_catagories":{"createdAt":"2018-01-13T19:26:09.633Z","updatedAt":"2018-01-13T19:26:09.633Z","productId":3,"categoryId":3}},{"id":1,"name":"Faceted","createdAt":"2018-01-13T19:26:09.523Z","updatedAt":"2018-01-13T19:26:09.523Z","product_catagories":{"createdAt":"2018-01-13T19:26:09.644Z","updatedAt":"2018-01-13T19:26:09.644Z","productId":3,"categoryId":1}}]}];

function mapStateToProps(store) {
    let {categories, allProducts:products,orders,users} = store;
    return {
        categories,
        products,
        orders,
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        loadCategories: () => {
            dispatch(fetchAllCategories())
        },
        loadProducts: () => {
            dispatch(fetchProducts())
        },
        loadOrders: () => {
            dispatch(fetchAllOrders())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser)