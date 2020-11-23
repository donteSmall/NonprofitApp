import React,  { useState, createContext } from "react";

/*
Creates a context, which allows to gain assess its props in another class
*/
export const ProgramsContext = createContext();

export const ProgramsContextProvider = (props) => {
    const [programs, setPrograms] = useState([]);

    const [ selectedProgram, setSelectedProgram ] = useState(null);
/*
Take all elements entered into programs array and copies into new array.
*/
    const addPrograms = (program) => {
        setPrograms([...programs, program]);
    };
/*
 * Note all values passed to ProgramsContext.provider are accessible. 
  To access, follow these steps:
  1. Import ProgramsContext
  2. Destructure addPrograms (i.e )
 */

    return (
        <ProgramsContext.Provider 
            value={{
                programs, 
                setPrograms, 
                addPrograms, 
                selectedProgram, 
                setSelectedProgram,
                }}>

            {props.children}
        </ProgramsContext.Provider>
   );
};