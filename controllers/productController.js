import Product from "../models/product.js";
import { isUserAdmin, isUserNull } from "../models/user.js";

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
            res.status(500).json({
                message: "Product couldn't add: "+e.message
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

        if (req.user.role == "admin") {
            const result = await Product.find();
            res.json(result);
        }


    } catch (e) {
        res.status(500).json({
            message: "Product fetch error: " + e
        });
    }
}

export async function updateProduct(req, res) {
    if (isUserNull(req)) {
        res.status(401).json({
            message: "Login first and try again"
        });
        return;
    }

    if (!isUserAdmin(req)) {
        res.status(401).json({
            message: "You are not authorized to perform this task"
        });
        return;
    }

    if (isUserAdmin(req)) {
        const updateKey = req.params.productKey;
        const productData = req.body;

        try {
            await Product.updateOne({
                productKey: updateKey
            },
                productData

                // dont add there to bracket because we not update specific key in Product, we already add from postman {}, so there no need to add { productData } => there will be update only which keys and values past from postmon, not whole product data changed.
                // EG: if we pass {"availability": false, price: 10000} => thre will be update only this keys , values from mongodb, no remove other keys and values


            );
            res.json({
                message: "Product update success ✅"
            });

        } catch (e) {
            res.status(500).json({
                message: "Product couldn't update error: " + e
            });
        }
    }
}


export async function deleteProduct(req, res) {
    const deleteKey = req.params.productKey;

    if (isUserNull(req)) {
        res.status(401).json({
            message: "Login first and try again"
        });
        return;
    }

    if (!isUserAdmin(req)) {
        res.status(401).json({
            message: "You are not authorized to perform this task"
        });
        return;
    }

    if (isUserAdmin(req)) {

        try {
            await Product.deleteOne({
                productKey: deleteKey
            });
            res.json({
                message: "Product delete success ✅"
            });
        } catch (e) {
             res.status(500).json({
                message: "Product couldn't delete error: " + e
            });
        }

    }
}