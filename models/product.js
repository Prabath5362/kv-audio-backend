import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productKey: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: "https://i.ibb.co/Pz4vzhTB/steptodown-com797046.jpg"
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Product = mongoose.model("products",productSchema);

export default Product;