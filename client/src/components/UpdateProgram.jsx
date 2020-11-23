import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import ProgramsFinder from '../apis/ProgramsFinder';
 


const UpdateProgram = (props) => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [serviceRange, setServiceRange] = useState("Program Range");
    let history = useHistory;
    
    useEffect(() => {
        const fetchData = async () => {
        const response = await ProgramsFinder(`/${id}`);
        
        console.log(response.data.data);
        
        //Update with entered Values from list 
        setName(response.data.data.programs.name);
        setLocation(response.data.data.programs.location);
        setServiceRange(response.data.data.programs.service_range);
    };
    
      fetchData();
    },[]);

    // Populates update feilds based on selected program
    const handleUpdateSubmit = async (byPassPageReload) => {
        
        byPassPageReload.preventDefault();
        
        const updateProgram = await ProgramsFinder.put(`/${id}`, {
            name,
            location, 
            service_range : serviceRange
        });
        history.push("/");

        console.log(updateProgram);

    };


    return ( 
        <div>
            <form action="">

                    <div className= "form-group"> 
                        <label htmlFor="name"> Name</label>
                            <input 
                            value={name}
                            onChange= {(updateName) => setName(updateName.target.value)} 
                            type="text" className="form-control" 
                            placeholder ="Name" />   
                    </div>
                    

                    <div className="form-group"> 
                        <label htmlFor="Location"> Location </label>
                            <input 
                            value={location }
                            onChange= {(updateLocation) => setLocation(updateLocation.target.value)} 
                            type="text" className="form-control" placeholder ="location"/>                        
                    </div>
                    
                    <div className="form-group"> 
                        <label htmlFor="Program Range"> Program Range </label>
                            <input 
                            value={serviceRange }
                            onChange= {(updateServiceRange) => setServiceRange(updateServiceRange.target.value)} 
                            className="form-control" placeholder ="Program Range" type="number" />
                        </div>
                    
                    <div>   
                    <button type="submit" onClick={handleUpdateSubmit} className="btn btn-primary" >Submit</button>
                    </div>


            </form>
        </div>

    );
};
export default UpdateProgram;