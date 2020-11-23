
import React, {useState} from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ProgramsFinder from '../apis/ProgramsFinder';

 const AddReviews = () => {
  
     const { id } = useParams();
     const history = useHistory();
     const location = useLocation();
     console.log(location);
     const [name, setName] = useState();
     const [reviewText, setReviewText] = useState();
     const [rating, setRating] = useState("Rating");

     const handleSubmitReview =  async (e) => {
         e.preventDefault();
         try {

            const response = await ProgramsFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating,
            });
            //Reloads the page by redirting to home page then back to review.
             history.push("/");
             history.push(location.pathname)

             console.log(response);

         } catch (error) {
             
         }
         

        

     }
    return (
        <div className= "mb-2" >
        <form action=""> 
        <div className= "form-row">
            <div className="form-group col-g"> 
                <label htmlFor="name">Name</label>
                <input 
                vaule={name}
                onChange = {e => setName(e.target.value)}

                id="name" 
                placeholder="name" 
                type="text" className="form-control" 
                />            
        
            </div>
                <div className="form-group col-g"> 
                <label htmlFor="rating">rating</label>
                    <select 
                    vaule={rating}
                    onChange = {e => setRating(e.target.value)}
                    
                    id="rating"  
                    className="custom-select">   
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
        </div>
            <div className="form-group">
            <label  htmlFor="Review" > Review </label>
            <textarea 
            vaule={reviewText}
            onChange = {e => setReviewText(e.target.value)}
            id="Review" 
            className="form-control">
            </textarea> 
            <button type= "submit" onClick={handleSubmitReview} className=" btn btn-primary">Submit Review</button>     
            </div>
  
        </form>
  
        </div>
    )
}

export default AddReviews;