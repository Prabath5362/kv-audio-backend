import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: true
    },

    profilePicture: {
        type: String,
        required: true,
        default: "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
    },

    comment: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        required: true,
    },

    isApproved: {
        type: Boolean,
        required: true,
        default: false
    }

})


const Review = mongoose.model("reviews",reviewSchema);

export default Review;