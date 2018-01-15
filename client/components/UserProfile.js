import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import AdminUser from './AdminUser';

/**
 * COMPONENT
 */

const css = `
#user-profile-view h3{
  margin-bottom:25px;
  font-size:110%;
  text-align:center;
}
form#user-input input{
  margin-left:25px;
}
form#user-input button{
  margin:12;
}
form#user-input div{
  display:block!important;
}
form#user-input>div{
  display:inline-block!important;
}
#user-profile-view .single-order{
  cursor:pointer;
}
#user-profile-view .order-details{
  transition: all 0.5s;
  max-height:0;
  overflow:hidden;
}
#user-profile-view .order-details.active{
  max-height:250px;
}
#user-profile-view th,#user-profile-view td{
  padding:5px 25px;
  text-align:center;
}
#user-profile-view admin-view-container{
  padding:30px;
}
.admin-table td.clickable{
  cursor:pointer;
  padding:0!important;
}
.admin-table td.clickable span{
  padding:24px;
}
.admin-dialog .full-width-input{
  width:100%!important;
}
.force-refresh{
  display:none;
}
`
let lastKeyCode;
document.onkeydown = evt => lastKeyCode = evt.keyCode

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
function atttemptSubmitUserData(){
}
function toggleOrderDetails(toggledIndex){
  let listOfOrders = Array.from(document.getElementsByClassName('order-details'))
  listOfOrders.forEach((elem,i) => {
    if(i===toggledIndex)return;
    $(elem).removeClass('active')
  })
  $(listOfOrders[toggledIndex]).toggleClass('active')
  console.log($(listOfOrders[toggledIndex]))
}
 function validate(type, value){
  switch(type){
    case 'zip':
      return /^\d{5}(?:[-\s]\d{4})?$/.test(value) ? null : 'Invalid Zip Code';
    case 'phone':
      return /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(value) ? null : 'Invalid Phone Number';
      break;
  }
}

function onZipChange(evt){
  let field=document.getElementById('zip');
  if(!isNumber(field.value.substring(-1,1)))field.value=field.value.substring(0,-1);
  if(field.value.length>5)field.value=field.value.substring(0,5);
}

function onPhoneChange(evt){
  let field=document.getElementById('phone');
  if(!isNumber(field.value.substring(-1,1)))field.value=field.value.substring(0,-1);
  if(lastKeyCode !== 8 && field.value.length === 3)field.value+='-';
  if(lastKeyCode !== 8 && field.value.length===7)field.value+='-';
  if(field.value.length>12)field.value=field.value.substring(0,12);
}
export const UserProfile = (props) => {
  console.log(document.getElementById('zip'));
  const {email, user} = props

  return (
    <div id='user-profile-view'>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <style>{css}</style>
      <Paper zDepth={2}>
      <Tabs>
      <Tab
      icon={<FontIcon className="material-icons">info_outline</FontIcon>}
      label="Edit Data"
      >
        <h3>Profile Data</h3> <hr />
        <form id='user-input' onSubmit={atttemptSubmitUserData}>
          <TextField hintText='Name'  id="name"/><br />
          <TextField hintText='Street' id='street'/><br />
          <TextField hintText='City' id='city'/><br />
          <TextField hintText='State' id='state'/><br />
          <TextField hintText='Zip' id='zip' onChange={onZipChange}/><br />
          <TextField hintText='Phone Number' id='phone' onChange={onPhoneChange}/><br />
          <RaisedButton label="Submit" onClick={atttemptSubmitUserData} />
        </form>
      </Tab>
      <Tab
      icon={<FontIcon className="material-icons">restore</FontIcon>}
      label="Order History"
      >
        <h3>Order History</h3> <hr />
        <table><tbody>
          <tr>
            <th>Order Id</th>
            <th>Order Status</th>
            <th>Order Date</th>
            <th>Shipped Date</th>
            <th>Order Total</th>
          </tr>
          { props.orders.map((order,i) => {
            return [(
              <tr key={'order'+i} className='single-order' onClick={()=>toggleOrderDetails(i)}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>{order.createdAt}</td>
                <td>{order.shipDate ? order.shipDate : `Not Shipped Yet`}</td>
                <td>${order.total/100}</td>
              </tr>),(
              <tr key={'detail'+i}><td colSpan='5'>
                <div className='order-details'><table><tbody>
                  <tr>
                    <th>Item #</th>
                    <th>Item Name</th>
                    <th>Purchase Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                  { order.products.map((product,i) => {
                    let purchase = product.order_products;
                    return (
                      <tr key={'product'+i}>
                        <td>{i+1}</td>
                        <td>{product.title}</td>
                        <td>${purchase.price /100}</td>
                        <td>{purchase.quantity}</td>
                        <td>${purchase.price * purchase.quantity / 100}</td>
                      </tr>
                  )})}
                </tbody></table></div>
              </td></tr>
          )]})} 
        </tbody></table>
      </Tab>
      {user && 
        //TODO: AUTH
        user.isAdmin || 1 }
      <Tab
      icon={<FontIcon className="material-icons">supervisor_account</FontIcon>}
      label="Admin"
      >
        <AdminUser />
      </Tab>
      </Tabs>
      </Paper>
      
        <h3>Welcome, {email}</h3>
    </div>
  )
}
/**
 * CONTAINER
 */
const tempOrder = [{"id":1,"status":"complete","shipDate":null,"total":9075,"createdAt":"2018-01-13T16:10:23.690Z","updatedAt":"2018-01-13T16:10:23.690Z","userId":1,"products":[{"id":3,"title":"Aquamarine","description":"March Birthstone","price":3025,"quantity":9,"imageUrl":"https://kids.nationalgeographic.com/content/dam/kids/photos/articles/Science/A-G/aquamarine-raw.adapt.945.1.jpg","createdAt":"2018-01-13T16:10:23.633Z","updatedAt":"2018-01-13T16:10:23.688Z","categoryId":3,"order_products":{"price":3025,"quantity":3,"createdAt":"2018-01-13T16:10:23.764Z","updatedAt":"2018-01-13T16:10:23.764Z","orderId":1,"productId":3}}],"user":{"id":1,"email":"lol@ha.ha","password":"f251b7923faf5d8c278d769bd19033932795cb50c53d0ead5e8b572457fe7951","salt":"vixE5ZVZJ9G4BE6rZED1fg==","googleId":null,"name":"bozo the clown","isAdmin":false,"forcePasswordReset":false,"street":"","city":"","state":"","zip":"11111","phone":"111-111-1111","createdAt":"2018-01-13T16:10:23.634Z","updatedAt":"2018-01-13T16:10:23.634Z"}},{"id":2,"status":"active","shipDate":null,"total":5825,"createdAt":"2018-01-13T16:10:23.690Z","updatedAt":"2018-01-13T16:10:23.690Z","userId":1,"products":[{"id":1,"title":"Kevin Garnet","description":"Garnets ( /ˈɡɑːrnɪt/) are a group of silicate minerals that have been used since the Bronze Age as gemstones and abrasives.","price":1299,"quantity":10,"imageUrl":"https://static.wixstatic.com/media/6e7517_0b00d9af3f504048902e4077b12a9a0c~mv2_d_2250_3000_s_2.jpeg/v1/fill/w_1196,h_1196,q_85,usm_0.66_1.00_0.01/6e7517_0b00d9af3f504048902e4077b12a9a0c~mv2_d_2250_3000_s_2.jpeg","createdAt":"2018-01-13T16:10:23.632Z","updatedAt":"2018-01-13T16:10:23.687Z","categoryId":1,"order_products":{"price":1299,"quantity":1,"createdAt":"2018-01-13T16:10:23.765Z","updatedAt":"2018-01-13T16:10:23.765Z","orderId":2,"productId":1}},{"id":2,"title":"Amethyst","description":"February Birthstone","price":1501,"quantity":14,"imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Amethyst._Magaliesburg%2C_South_Africa.jpg/1200px-Amethyst._Magaliesburg%2C_South_Africa.jpg","createdAt":"2018-01-13T16:10:23.633Z","updatedAt":"2018-01-13T16:10:23.687Z","categoryId":2,"order_products":{"price":1501,"quantity":1,"createdAt":"2018-01-13T16:10:23.765Z","updatedAt":"2018-01-13T16:10:23.765Z","orderId":2,"productId":2}},{"id":3,"title":"Aquamarine","description":"March Birthstone","price":3025,"quantity":9,"imageUrl":"https://kids.nationalgeographic.com/content/dam/kids/photos/articles/Science/A-G/aquamarine-raw.adapt.945.1.jpg","createdAt":"2018-01-13T16:10:23.633Z","updatedAt":"2018-01-13T16:10:23.688Z","categoryId":3,"order_products":{"price":3025,"quantity":1,"createdAt":"2018-01-13T16:10:23.764Z","updatedAt":"2018-01-13T16:10:23.764Z","orderId":2,"productId":3}}],"user":{"id":1,"email":"lol@ha.ha","password":"f251b7923faf5d8c278d769bd19033932795cb50c53d0ead5e8b572457fe7951","salt":"vixE5ZVZJ9G4BE6rZED1fg==","googleId":null,"name":"bozo the clown","isAdmin":false,"forcePasswordReset":false,"street":"","city":"","state":"","zip":"11111","phone":"111-111-1111","createdAt":"2018-01-13T16:10:23.634Z","updatedAt":"2018-01-13T16:10:23.634Z"}}]
const mapState = (state) => {
  return {
    email: state.user?state.user.email:'',
    orders: state.orders || tempOrder,
  }
}

export default connect(mapState)(UserProfile)

/**
 * PROP TYPES
 */
UserProfile.propTypes = {
  email: PropTypes.string
}
