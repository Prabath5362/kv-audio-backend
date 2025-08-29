import Product from "../models/product.js";

export async function addProduct(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "Login first and try again"
        });
        return;
    }

    if (req.user.role != "admin") {
        res.status(401).json({
            message: "You are not authorized to perform this task"
        });
        return;
    }

    if (req.user.role == "admin") {
        const productData = req.body;
        const product = Product(productData);
        try {
            await product.save();
            res.json({
                message: "Product add success ✅"
            });
        } catch (e) {
            res.json({
                message: "Product couldn't add error: " + e
            });
        }
    }
}


export async function getProduct(req, res) {
    try {
        if (req.user == null || req.user.role != "admin") {
            const result = await Product.find({
                availability: true
            });
            res.json(result);
            return;
        }

        if(req.user.role == "admin"){
            const result = await Product.find();
        res.json(result);
        }


    } catch (e) {
        res.json({
            message: "Product fetch error: " + e
        });
    }
}