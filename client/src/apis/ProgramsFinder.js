import axios from "axios";


//Retieves data from front-end, api defined
/*
This path will be appended to the when called in the apis/ProgramsFinder 
*/


export default axios.create({
    baseURL: "http://localhost:3000/api/v1/programs",
});
