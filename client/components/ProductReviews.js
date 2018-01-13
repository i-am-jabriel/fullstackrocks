// // import React, { Component } from 'react';

// // class ProductReviews extends Component {


// //   // console.log("this is running reviews.id: ", reviews.id)

// //   render() {
// //     return (
// //       <ul>
// //         {/* {console.log("this is inside return: ", this.props.reviews())} */}
// //         {
// //           this.props.reviews.map((review) => (
// //             <li key={review.id}>
// //               <div>
// //                 <a href="#">
// //                   <h4 className="media-object">{review.user.name}</h4>
// //                 </a>
// //                 <a href="#">
// //                   <span className="media-object">{review.title}</span>
// //                 </a>
// //               </div>

// //               <div>
// //                   <h4>{review.description}</h4>
// //               </div>

// //             </li>
// //           ))
// //         }
// //       </ul>
// //     )
// //   }
// // }


// import React from 'react';

// export default function ProductReviews (props) {

//   const reviews = props.reviews;
// // console.log(reviews);

//   return (
//     <ul>
//       {
//         reviews && reviews.map((review) => (
//           <li key={review.id}>
//             <div>
//               <a href="#">
//                 <h4 className="media-object">{review.user.name}</h4>
//               </a>
//               <a href="#">
//                 <span className="media-object">{review.title}</span>
//               </a>
//             </div>

//             <div>
//                 <h4>{review.description}</h4>
//             </div>

//           </li>
//         ))
//       }
//     </ul>
//   )

// }
