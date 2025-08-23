import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/userRoute.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRoute.js";
import reviewRouter from "./routes/reviewRoute.js";

const app = express();
dotenv.config();
app.use(bodyParser.json());

app.use((req, res, next) => {
    let token = req.header("Authorization");
    if (token != null) {
        token = token.replace("Bearer ", "");

        const tokenData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = tokenData;

        
    }

    next();
});




mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Mongodb connected success✅");

}).catch((e) => {
    console.log("Mongodb couldn't connect , error: " + e);
})


app.use("/api/user", userRouter);
app.use("/api/product",productRouter);
app.use("/api/review",reviewRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");

});


