import express from "express";
import { addInquiry, deleteInquiry, getInquiry, updateInqury } from "../controllers/inquiryController.js";

const inquiryRouter = express.Router();


inquiryRouter.post("/addInquiry",addInquiry);
inquiryRouter.get("/getInquiry",getInquiry);
inquiryRouter.delete("/deleteInquiry/:id",deleteInquiry);
inquiryRouter.put("/updateInquiry/:id",updateInqury);


export default inquiryRouter;