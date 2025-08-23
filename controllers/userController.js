import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

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


export function loginUser(req,res){


    const userData = req.body;

    User.findOne({
        email: userData.email
    }).then((user)=>{
        if(user == null){
             res.json({
                message: "User not found, Register first"
            })
            return;
        }

        const isPasswordValid = bcrypt.compareSync(userData.password,user.password);

        if(isPasswordValid){
            const token = jwt.sign({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture: user.profilePicture,
                role: user.role
            },process.env.JWT_SECRET);

            res.json({
                message: "Login Success ✅",
                token: token
            })
        }else{
             res.json({
                message: "Password not matched"
            })
        }
    })
}