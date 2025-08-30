import express from "express";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/addProduct",addProduct);
productRouter.get("/getProduct",getProduct);
productRouter.put("/updateProduct/:productKey",updateProduct);
productRouter.delete("/deleteProduct/:productKey",deleteProduct);


export default productRouter;