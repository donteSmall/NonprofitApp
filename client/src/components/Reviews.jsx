import React from "react";
import StarRating from "./StarRating";

 {/*  how are review being proprogated via this variable */}
const Reviews = ({reviews} ) => {
  return (

    <div className="row row-cols-3 mb-2">
        {reviews.map((review) => {
          return ( 
            
            <div key = {review.id}
            className="card text-white bg-primary mb-3 mr-4" 
            style={{ maxWidth: "30%" }}
        >

        <div className="card-header d-flex justify-content-between">
                <span>{review.name}</span>

                <span>
                <StarRating enteredRating={review.rating} /> 
                </span>

        </div>

        <div className="card-body">
            <p className="card-text"> {review.review}</p>
            </div>
          </div>
        );
      })}

 {/*  Start of Review Card */}
 {/*  End of Review Card */}
       
       

    </div>
      
    );
  };

export default Reviews;