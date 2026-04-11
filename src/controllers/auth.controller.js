import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const registerUser = async (req,res) => {
    
        const{useranme,email,password,role="user"} = req.body;
        console.log("user registered sucessfully");

        const isUserAlreadyExist = userModel.findOne({
            $or:[
                {username},
                {email}
            ]
        })

        if(isUserAlreadyExist){
            return res.status(409).json({message:"user already exist"}),
            console.log("user already exist")
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

        res.status(201).json({message: "user created sucessfully"}),
        console.log("user created")

    
}

const login = async(req,res) =>{
    const {username, email, password, role} = req.body;

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(409).json({message:"user inalid"}),
        console.log("user not found")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(409).json({message:"invalid password"})
       
    }
    
    const token = jwt.sign({id:user._id, role: user.role}, process.env.JWT_SECRET);
    res.cookie("token", token)


    res.status(201).json({
        message:"login sucessfully",
        user
    })

    
}

export default {registerUser, login}