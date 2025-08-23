import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/userRoute.js";

const app = express();

app.use(bodyParser.json());

dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Mongodb connected success✅");
    
}).catch((e)=>{
     console.log("Mongodb couldn't connect , error: "+e);
})


app.use("/api/user",userRouter)

app.listen(3000,()=>{
    console.log("Server running on port 3000");
    
});


