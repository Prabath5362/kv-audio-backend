export function addProduct(req,res){
    if(req.user == null){
        res.status(401).json({
            message: "Login first and try again"
        })
        return;
    }

    if(req.user.role != "admin"){
        res.status(401).json({
            message: "You are not authorized to perform this task"
        })
        return;
    }

    if(req.user.role == "admin"){
         res.json({
            message: "Product add success ✅"
        })
    }
}