import React, {useContext, useState}from 'react'
import ProgramsFinder from "../apis/ProgramsFinder"
import { ProgramsContext } from '../context/ProgramsContext';
  /* 
    
    useState allows us to capture entered data from (Name,Location, Service_Range) feilds:
    To test:
     1. Enter data into feild 
     2. Navigate to the components tab 
     3. Select the Addprograms component from the treeview, entered text should display
    
     Example mapping of useState variables:
     value= {name} onChange={enteredName => setName(enteredName.target.value)} 
    
    */
const AddPrograms = () => {
  
    const {addPrograms} = useContext(ProgramsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [serviceRange, setServiceRange] = useState("Program Range");


    const handleSubmit = async (captureSubmittedData) => {
        /*
        Important method, this will prevent the pages from automatically 
        reloading a page and losing user entered data !
        */
        captureSubmittedData.preventDefault();
        try {
           const response = await ProgramsFinder.post("/", {
                name,
                location,
                service_range: serviceRange

            });
            addPrograms(response.data.data.programs);
            console.log(response);
        } catch (error) {
            console.log(error);
            
        }


    };
    return (
        <div className="mb-4">
            <form action="">
            
                <div className="form-row">  
                <div className="col">
                <input 
                value= {name} 
                onChange={enteredName => setName(enteredName.target.value)} 
                type= "text" className="form-control" placeholder ="name"/>
                </div>

                <div className="col">
                <input 
                value= {location} 
                onChange={enteredLocation => setLocation(enteredLocation.target.value)}  
                type="text" className="form-control" placeholder ="location"/>
                </div>

                <div className="col">
                <select 
                    value= {serviceRange} 
                    onChange={enteredServiceRange => setServiceRange(enteredServiceRange.target.value)}  
                    className="custom-select my-1 mr-sm-2" >
              <option disabled>Price Range</option>
              <option value="1">*</option>
              <option value="2">**</option>
              <option value="3">***</option>
              <option value="4">****</option>
              <option value="5">*****</option>
            </select>
                </div>

                <div>
                    <button onClick= {handleSubmit} type= "submit" className="btn btn-primary"> Add </button>
                </div>
                
                </div> 
            </form>
        </div>
    )
}
export default AddPrograms;