import musicModel from "../models/music.model.js";
import jwt from "jsonwebtoken";

const createMusic = async (req, res) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(409).json({message: "user invalid"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "artist"){
            return res.status(409).json({message: "not allowed"});
        }
        
        const {title, songUrl, imageUrl} = req.body;

        if(!songUrl || !imageUrl){
            return res.status(400).json({message: "urls required"});
        }

        const music = await musicModel.create({
            title,
            url: songUrl,
            image: imageUrl,
            artist: decoded.id
        });

        res.status(201).json({
            message: "music created successfully",
            music
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "error"});
    }
};

const getAllMusic = async(req, res) => {
    try{
     const songs = await musicModel.find().populate("artist", "username");
     res.status(200).json(songs)
    }
    catch(err){
        return res.status(404).json({message: "error", err})
    }
}

export default {createMusic, getAllMusic}