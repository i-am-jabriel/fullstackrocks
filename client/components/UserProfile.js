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
`
let lastKeyCode;
 document.onkeydown = evt => {
   lastKeyCode = evt.keyCode;
 }

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function atttemptSubmit(){

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
        <form id='user-input' onSubmit={atttemptSubmit}>
          <TextField hintText='Name'  id="name"/><br />
          <TextField hintText='Street' id='street'/><br />
          <TextField hintText='City' id='city'/><br />
          <TextField hintText='State' id='state'/><br />
          <TextField hintText='Zip' id='zip' onChange={onZipChange}/><br />
          <TextField hintText='Phone Number' id='phone' onChange={onPhoneChange}/><br />
          <RaisedButton label="Submit" onClick={atttemptSubmit} />
        </form>
      </Tab>
      <Tab
      icon={<FontIcon className="material-icons">restore</FontIcon>}
      label="Order History"
      >
        <h3>Order History</h3> <hr />
        <table>
          <tbody>
            <tr>
              <th>Order Id</th>
              <th>Order Date</th>
              <th>Order Total</th>
            </tr>
            {props.orders.map(order => {
              return (
                <tr>
                  <td>
                    
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Tab>
      {user && user.isAdmin || 1 }
      <Tab
      icon={<FontIcon className="material-icons">supervisor_account</FontIcon>}
      label="Admin"
      >
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
const mapState = (state) => {
  return {
    email: state.user.email,
    orders: state.user.orders || [],
  }
}

export default connect(mapState)(UserProfile)

/**
 * PROP TYPES
 */
UserProfile.propTypes = {
  email: PropTypes.string
}
