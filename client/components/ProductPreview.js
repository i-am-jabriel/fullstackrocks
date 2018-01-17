import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { NavLink } from 'react-router-dom'

const cardStyle = {
    width: '30vw',
    height: '35vw',
    textAlign: 'center',
    display: 'inline-flex',
    margin: '0'
}


const ProductPreview = (props) => (

    <Card style={cardStyle}>

        <CardTitle title={props.product.title} />
        <NavLink to={`/products/${props.product.id}`}><img className='prodPreviewImg' src={props.product.imageUrl} alt="" /></NavLink>
        <CardText>
            {props.product.description}
            <br />
            <hr />
            Price: ${props.product.showPrice}
        </CardText>
        <CardActions>
            <FlatButton label="Add To Cart" onClick={() => props.addProductToCart(props.currentUser.id, props.product.id, props.product.price)} />
        </CardActions>
    </Card>
);

export default ProductPreview;