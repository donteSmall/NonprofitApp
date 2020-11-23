import React, { useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import ProgramsFinder from '../apis/ProgramsFinder';
import { ProgramsContext } from '../context/ProgramsContext';
import AddReviews from './AddReviews';
import Reviews from './Reviews';
import StarRating from './StarRating';


 const ProgramDetails = () => {

    const { id } = useParams();
    
    const { selectedProgram, setSelectedProgram  } = useContext(ProgramsContext);
   


      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await ProgramsFinder.get(`/${id}`);
            console.log(response);

            setSelectedProgram(response.data.data);

          //Problem line, returns not a Function. Linked to ProgramContext 
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchData();
      }, []);
   


      return (
        <div>
          {selectedProgram && (
            <>
            <h1 className= "text-center display-1" > 
            {selectedProgram.programs.name}</h1>

            <div className="text-center mt-3">

                <StarRating enteredRating={selectedProgram.programs.average_rating} />
               
              </div>

              <div className="mt-3">
                <Reviews reviews={selectedProgram.reviews} />
              </div>
              
              <div> 
                <AddReviews/>
              </div>
            
            </>
          )}
        </div>
      );
    };

export default ProgramDetails;