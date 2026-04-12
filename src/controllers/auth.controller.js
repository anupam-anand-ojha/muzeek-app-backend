import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const registerUser = async (req,res) => {
    
        const{username,email,password,role="user"} = req.body;
        console.log("user registered sucessfully");

        const isUserAlreadyExist = await userModel.findOne({
            $or:[
                {username},
                {email}
            ]
        })

        if(isUserAlreadyExist){
            console.log("user already exist")
            return res.status(401).json({message:"user already exist"})
        }
        
        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hash,
            role
        })

        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET);
        res.cookie("token", token);

        res.status(201).json({message: "user created sucessfully"})

    
}
 //login setup
 
const login = async(req,res) =>{
    const {username, email, password, role} = req.body;

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        console.log("user not found")
        return res.status(404).json({message:"user inalid"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({message:"invalid password"})
       
    }
    
    const token = jwt.sign({id:user._id, role: user.role}, process.env.JWT_SECRET);
    res.cookie("token", token)


    res.status(201).json({
        message:"login sucessfully",
        user
    })

    
}

export default {registerUser, login}