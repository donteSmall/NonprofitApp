import React from 'react';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import { ProgramsContextProvider } from './context/ProgramsContext';
import Home from "./routes/Home";
import ProgramsDetailsPage from "./routes/ProgramsDetailsPage";
import UpdatePage from "./routes/UpdatePage";


const App = () => {
    /*
     Defines the UI page mapping, which derives from the pages/components created in the routes folder.  
    */
    return (
<ProgramsContextProvider> 
    <div className="container"> 
        <Router>

            <Switch> 
                <Route exact path="/" component= {Home}/>

                <Route exact path="/programs/:id/update"  component= {UpdatePage}/>

                <Route exact path="/programs/:id/" component= {ProgramsDetailsPage}/>

            </Switch>
        </Router>
    </div>
</ProgramsContextProvider>
     );
    };

export default App;