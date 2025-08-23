import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/userRoute.js";
import jwt from "jsonwebtoken";

const app = express();
dotenv.config();
app.use(bodyParser.json());

app.use((req, res, next) => {
    let token = req.header("Authorization");
    if (token != null) {
        token = token.replace("Bearer ", "");

        const tokenData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = tokenData;

        console.log(req.user);
    }

    next();
});




mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Mongodb connected success✅");

}).catch((e) => {
    console.log("Mongodb couldn't connect , error: " + e);
})


app.use("/api/user", userRouter)

app.listen(3000, () => {
    console.log("Server running on port 3000");

});


