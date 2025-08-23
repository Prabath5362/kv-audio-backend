import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

const app = express();

app.use(bodyParser);

dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Mongodb connected success✅");
    
}).catch((e)=>{
     console.log("Mongodb couldn't connect , error: "+e);
})

app.listen(3000,()=>{
    console.log("Server running on port 3000");
    
});


