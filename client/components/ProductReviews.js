import React from 'react';

export default function ProductReviews (props) {

  const reviews = props.reviews;

  return (
    <ul>
      {
        reviews.map((review) => (
          <li key={review.id}>
            <div>
              <a href="#">
                <h4 className="media-object">{review.user.name}</h4>
              </a>
              <a href="#">
                <span className="media-object">{review.title}</span>
              </a>
            </div>

            <div>
                <h4>{review.description}</h4>
            </div>

          </li>
        ))
      }
    </ul>
  )
}
