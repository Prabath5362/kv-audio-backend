import express from "express";
import { addProduct, getProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/addProduct",addProduct);
productRouter.get("/getProduct",getProduct);


export default productRouter;