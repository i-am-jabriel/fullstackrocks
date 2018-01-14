import React from 'react'
import Avatar from 'material-ui/Avatar'
import ListItem from 'material-ui/List/ListItem';


export default function ProductReviews (props) {

  const reviews = props.reviews;

  return (
    <ul>
      {
        reviews.length && reviews.map((review) => (
          <li key={review.id}>
            <div>
                <ListItem
                disabled={true}
                leftAvatar={<Avatar>{review.user.name[0].toUpperCase()}</Avatar>}>
                <span>{review.user.name}</span>
                </ListItem>
                <b>{review.title}</b><br />
            </div>
            <div>
                <span>{review.description}</span>
            </div>
          </li>
        ))
      }
    </ul>
  )
}
