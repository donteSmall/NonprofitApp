require("dotenv").config()
const express = require("express");
const cors = require("cors");
const db = require("./db");


const morgan = require("morgan");

const app = express();


//By default two different domain can't talk to each other.
//used to aviod domain request error, where our api request is denied we add cors as  another middlewears
app.use(cors());



//Bulit-in express Middleware,store posted data in body 
//and it converts data into a maniplable javascript object 
app.use(express.json());

/*
Creating route with (req, res) params navigates here 
in chrome -> (http://localhost:4000/api/v1/programs)
*/

// Get All Programs  Method
app.get("/api/v1/programs", async (req, res)=> {
try{
//Retrieves data from db 
//const db_result = await db.query('SELECT * FROM programs');
const programRatingData = await db.query("SELECT * FROM programs left join (select program_id, COUNT(*), Trunc(AVG(rating),1) as average_rating from reviews group by program_id) reviews on programs.id = reviews.program_id;");

 //console.log("Results",db_result);

 console.log("ProgramRatingData ",programRatingData );


// added property to show length of results,
 res.status(200).json({
     status: "success",
     db_results: programRatingData.rows.length,
     data:{
        programs: programRatingData.rows,
     },
 });
}catch (err) {
    console.log(err);
}
});

// Gets a program
app.get("/api/v1/programs/:id", async (req, res)=> {
    console.log(req.params.id);
    try{
        //Implemented paramartized query ($1) to safeguard against sql injection attack


        const program= await db.query("SELECT * FROM programs left join (select program_id, COUNT(*), Trunc(AVG(rating),1) as average_rating from reviews group by program_id) reviews on programs.id=reviews.program_id where id= $1",
        [req.params.id]);
        
        const reviews = await db.query("SELECT * FROM reviews where  program_id= $1",
        [req.params.id]);

        // added property to show length of results,
        res.status(200).json({
            status: "success",
            data:{
            programs: program.rows[0],
            reviews: reviews.rows,
            },
        });

        console.log(reviews)
        
        }catch (err) {
            console.log(err);
        }
   });

   // Create a program
app.post("/api/v1/programs", async (req, res)=> {
    console.log(req.body);
    try {
        // By default postgres does not returing anything, therefore it will not out the new program added to the db
        //To get a response,you need to included (returning *) at the end the query return the new entry.
        const db_result = await db.query(
            "INSERT INTO programs (name, location, service_range ) values($1,$2,$3) returning *",
         [req.body.name,req.body.location,req.body.service_range]
         );
         console.log(db_result);
        //returns data back to front-end
         res.status(201).json({
            status: "succes",
            data:{
               programs: db_result.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }

   });

    // Update/Post 
    app.put("/api/v1/programs/:id",async (req,res) => {

    try {
        
        const db_result = await db.query(
            "UPDATE programs SET name =$1, location =$2 , service_range=$3  where id =$4 returning *",
         [req.body.name,req.body.location,req.body.service_range,req.params.id]
         );
        // console.log(db_result);
        //returns data back to front-end
         res.status(201).json({
            status: "succes",
            data:{
               programs: db_result.rows[0]
            },
        });
    } catch (error) {
        console.log(error);
    }
    
    });

   // Delete a program 
   app.delete("/api/v1/programs/:id", async (req,res) => {

    try {
        console.log(req.params.id);
        console.log(req.body);  
        const db_result = await db.query(
            "Delete  FROM programs where id =$1",
         [req.params.id]
         );
        //  console.log(db_result);
       
         //Nothing will return since we've deleted an entry
         res.status(204).json({
            status: "succes",
            data:{ 
               programs: db_result.rows[0]
            },
        });
        
    } catch (error) {
        console(error)
    }
});


app.post("/api/v1/programs/:id/addReview", async (req,res) => {
    try {
     
        const new_Review = await db.query(
            "INSERT INTO reviews (program_id, name, review,rating) values($1,$2,$3,$4) returning *;",
         [req.params.id, req.body.name,req.body.review,req.body.rating]
         );

        //console.log(new_Review);

         res.status(201).json({
            status: "success",
            data:{ 
               review: new_Review.rows[0]
            },
        });

    } catch (error) {
        console.log(error)
    }
});


//defined default port 
const port = process.env.PORT || 4000;

app.listen(port , () => {console.log(`server is up and listening on port ${port}`);});

