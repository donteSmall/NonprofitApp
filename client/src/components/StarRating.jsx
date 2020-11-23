import React from 'react'

 const StarRating = ({enteredRating}) => {
    const stars =[];

    for (let idx = 1;  idx <= 5 ;idx++){
       
        if (idx <= enteredRating){
           
            stars.push(<i key={idx} className="fas fa-star text-warning"></i>);

        }else if(idx === Math.ceil(enteredRating)  && !Number.isInteger(enteredRating) ) {
            
            stars.push(<i key={idx} className="fas fa-star-half-alt text-warning"></i>);
        }else{
           
            stars.push(<i key={idx} className="far fa-star text-warning"></i>);

        }
    }



    return <> {stars}</>;
}
export default StarRating;