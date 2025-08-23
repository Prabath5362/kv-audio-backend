import Review from "../models/review.js";

export function addReview(req,res){
    if(req.user == null){
        res.status(401).json({
            message: "Login first to perform this task"
        })
        return;
    }

    const reviewData = req.body;
    reviewData.email = req.user.email;
    reviewData.name = req.user.firstName + " "+ req.user.lastName;
    reviewData.profilePicture = req.user.profilePicture;

    const review  = new Review(reviewData);

    review.save().then(()=>{
        res.json({
            message: "Review add success ✅"
        })
    }).catch((e)=>{
        res.json({
            message: "Review couldn't add error"+e
        })
    })
}

export function getReviews(req,res){
    if( req.user != null && req.user.role == "admin"){
        Review.find().then((result)=>{
            res.json(result);
        }).catch((e)=>{
            res.status(500).json({
                message: "Reviews fetch error: "+e
            })
        })
        return;
    }


    Review.find({
        isApproved: true
    }).then((result)=>{
            res.json(result);
        }).catch((e)=>{
            res.status(500).json({
                message: "Reviews fetch error: "+e
            })
        })

}

export function deleteReview(req,res){
    // we use url variable (req.params.xyz)
    const deleteEmail = req.params.email;

    if(req.user == null){
        res.status(401).json({
            message: "Login first and try again"
        })
        null;
    }

    if(req.user.role == "admin"){
        Review.deleteOne({
            email: deleteEmail
        }).then(()=>{
            res.json({
                message: "Review deleted success ✅"
            })
        }).catch((e)=>{
            res.status(500).json({
                message: "Review couldn't deleted, error: "+e
            })
        })
        return;
    }

    if(req.user.role == "customer"){
        if(deleteEmail != req.user.email){
            res.status(500).json({
                message: "You are not able to delete others review"
            })
            return;
        }

        Review.deleteOne({
            email: deleteEmail
        }).then(()=>{
            res.json({
                message: "Review deleted success ✅"
            })
        }).catch((e)=>{
            res.status(500).json({
                message: "Review couldn't deleted, error: "+e
            })
        })

    }

}

export function approveReview(req, res) {
    if(req.user == null){
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

    Review.updateOne({
        email: req.params.email
    }, {
        isApproved: true
    }).then(() => {
        res.json({
            message: "Review approve success ✅"
        })
    }).catch((e) => {
        res.json({
            message: "Review is not approved error: " + e
        })
    })
}