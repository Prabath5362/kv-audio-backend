import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
        default: "customer"
    },

    address: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    profilePicture : {
        type: String,
        required: true,
        default: "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
    }
});

const User = mongoose.model("users",userSchema);

export default User;