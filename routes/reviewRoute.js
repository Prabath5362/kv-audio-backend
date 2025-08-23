import express from "express"
import { addReview, deleteReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/addReview",addReview);
reviewRouter.get("/getReview",getReviews);
reviewRouter.delete("/deleteReview/:email",deleteReview);

export default reviewRouter;