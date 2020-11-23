import React, {useContext, useEffect} from 'react'
import ProgramsFinder from '../apis/ProgramsFinder'
import { ProgramsContext } from '../context/ProgramsContext'
import { useHistory } from "react-router-dom";
import StarRating from './StarRating';




const ProgramList = (props) => {
//Passed an defined object from programscontext 
const { programs, setPrograms} = useContext(ProgramsContext);
//Browerhistory
let updateByBrowerHistory = useHistory();

    /* 

    Params(arrow, empty dependency array) we pass 
    in the empty dependency array to only 
    runs when the componets mounts 
    */
    useEffect(() => {

        /*
        We defined/wrote an async function (fethcdata 
        inside our effect and called it immediately due to the following error:
        
        An effect function must not return anything besides a function, 
        which is used for clean-up.
        */
        const fetchData = async () => {
        try {
            //reterives URL from apis/ProgramFinder
            const response = await ProgramsFinder.get("/");
            console.log(response.data.data);
            
            //should populate all programs from db
            setPrograms(response.data.data.programs);
        
        } catch (err) {}
        };

        fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        try {
            // evemt to stop upward propagation
            e.stopPropagation();
            const deleteProgramby_ID = await ProgramsFinder.delete(`/${id}`);
            // console.log(delResponse);
            /*
            update UI to reflect deleted program, 
            will check to see listed id equal recently deleted ids
            */
            setPrograms(programs.filter(programs => {
                return programs.id !== id
            })
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleHistory = (e,id) => {
        e.stopPropagation();
        updateByBrowerHistory.push(`/programs/${id}/update`);
    };
    //Redirect trigger to the details page
    const handleSelectedProgramTodetailsPage = (id) => {
        updateByBrowerHistory.push(`/programs/${id}`);
    };

    const renderRatingToScreen = (program) => {
        if(!program.count) {
            return <span className="text-warning "> (0 reviews)</span>
        }
        return (
            <>
               <StarRating enteredRating={program.id}/>
               <span className="text-warning ml-1">({program.count})</span>
            </>
        );
    };
   
        
    return (
        <div className="list-group">
            <table className="=table table-hover table-dark">
        <thead>
            <tr className="bg-primary">
            <th scope="col">Program</th>
            <th scope="col">Location</th>
            <th scope="col">Serivce range</th>
            <th scope="col">Ratings </th>
            <th scope="col">Edit</th>
            <th scope="col">Delete </th>

            </tr>
        </thead>
        <tbody>
        {/* 

        Taksaway:
        * Below we use the map function to render data from backend -to-front-end
        * programs && -> ensure that code is not run if a program does not exist
        * To render '$' you will need to use string representation then call programs_range 
        */}
        {programs && programs.map((programs)=> {
            return (
                <tr onClick= { 
                () => handleSelectedProgramTodetailsPage(programs.id) } 
                key = {programs.id}>

            <td>{programs.name}</td>

            <td>{programs.location}</td>

            <td>{"$".repeat(programs.service_range)}</td>

            <td>{renderRatingToScreen(programs)}</td>

            <td>
                <button onClick = { 
                    (e) => handleHistory( e, programs.id)} 
                    className="btn btn-danger">Update</button>
            </td>

            <td>
                <button 
                onClick = { (e) => handleDelete(e, programs.id)} 
                className="btn btn-danger">Delete</button>
            </td>  
            </tr>
            );     
        })}
        </tbody>
        </table>
        </div>
    );
};
export default ProgramList;