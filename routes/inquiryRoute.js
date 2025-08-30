import express from "express";
import { addInquiry, deleteInquiry, getInquiry } from "../controllers/inquiryController.js";

const inquiryRouter = express.Router();


inquiryRouter.post("/addInquiry",addInquiry);
inquiryRouter.get("/getInquiry",getInquiry);
inquiryRouter.delete("/deleteInquiry/:id",deleteInquiry);


export default inquiryRouter;