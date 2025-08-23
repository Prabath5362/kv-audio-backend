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