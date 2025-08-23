import Product from "../models/product.js";

export function addProduct(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "Login first and try again"
        })
        return;
    }

    if (req.user.role != "admin") {
        res.status(401).json({
            message: "You are not authorized to perform this task"
        })
        return;
    }

    if (req.user.role == "admin") {
        const productData = req.body;

        const product = Product(productData);

        product.save().then(() => {
            res.json({
                message: "Product add success ✅"
            })
        }).catch((e)=>{
             res.json({
                message: "Product couldn't add error: "+e
            })
        })


    }
}