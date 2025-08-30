import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export async function registerUser(req, res) {

    const userData = req.body;
    userData.password = bcrypt.hashSync(userData.password, 10);

    if (req.user == null || req.user.role != "admin") {
        userData.role = "customer";
    }

    const user = new User(userData);

    try {
        await user.save();
        res.json({
            message: "Registration success ✅"
        })
    }
    catch (e) {
        res.json({
            message: "Registration failed :" + e
        })
    }
}


export async function loginUser(req, res) {
    
    try{
        const userData = req.body;
    const user = await User.findOne({
        email: userData.email
    });

    if (user == null) {
        res.json({
            message: "User not found, Register first"
        })
        return;
    }

    const isPasswordValid = bcrypt.compareSync(userData.password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture,
            role: user.role,
            phone: user.phone
        }, process.env.JWT_SECRET);

        res.json({
            message: "Login Success ✅",
            token: token
        })
    } else {
        res.json({
            message: "Password not matched"
        })
    }
    }
    catch(e){
         res.json({
            message: "Login failed :" + e
        })
    }

}