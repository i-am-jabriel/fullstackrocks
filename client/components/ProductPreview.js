import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
        <img className='prodPreviewImg' src={props.product.imageUrl} alt="" />
        <CardText>
            {props.product.description}
        </CardText>
        <CardActions>
            <FlatButton label="Add To Cart" />
            <FlatButton label="Leave Review" />
        </CardActions>
    </Card>
);

export default ProductPreview;