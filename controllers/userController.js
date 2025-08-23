import bcrypt from "bcrypt";
import User from "../models/user";

export function registerUser(req,res){
    const userData = req.body;
    userData.password = bcrypt.hashSync(userData.password,10);

    const user = new User(userData);

    user.save().then(()=>{
        res.json({
            message: "Registration success ✅"
        })
    }).catch((e)=>{
         res.json({
            message: "Registration failed :"+e
        })
    })
}