import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:[true, "Plese enter unique username"],
        require: [true, "Please enter your username"]

    },
    email:{
        type: String,
        require: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use valid email"]

    },
    password:{
        type: String,
    },
    role:{
        type: String,
        enum:["user","artist"],
        default: "user"
    }
})  

const userModel = mongoose.model("user", userSchema);

export default userModel