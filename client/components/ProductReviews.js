import React from 'react'
import Avatar from 'material-ui/Avatar'
import ListItem from 'material-ui/List/ListItem'
//import { Rating } from 'material-ui-rating'


export default function ProductReviews (props) {

  const reviews = props.reviews;
  console.log(reviews)

  return (
    <ul style={{listStyle: 'none'}}>
      {
        reviews.length && reviews.map((review) => (
          <li key={review.id}>
            <div>
                <ListItem
                disabled={true}
                leftAvatar={<Avatar>{review.user.name[0].toUpperCase()}</Avatar>}>
                <span>{review.user.name}</span>
                </ListItem>
                <b>{review.title}</b><br /><br />
                {/*
                Disabled while we find a replacement that works on windows
                <Rating
                  onRate={() => console.log('onRate')}
                  value={3}
                  max={5}
                  onChange={() => console.log('onChange')}
                  disabled
                />*/}
            </div>
            <div>
                <span>{review.description}</span><br />
            </div>
          </li>
        ))
      }
    </ul>
  )
}
