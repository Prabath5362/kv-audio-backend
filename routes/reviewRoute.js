import express from "express"
import { addReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/addReview",addReview);
reviewRouter.get("/getReview",getReviews);

export default reviewRouter;