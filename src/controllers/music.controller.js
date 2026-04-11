import musicModel from "../models/music.model.js";
import jwt from "jsonwebtoken"
import {uploadFiles} from "../services/storage.service.js"

const createMusic = async (req, res) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(409).json({message: "user invalid"});
    }

    try{
        const decoded = jwt.verify(token, process.env,JWT_SECRET);

        if(decoded.role !== "artist"){
            return res.status(409).json({message: "you are not allow to create music"});
        }
        
        const {title} = req.body;
        const songFile = req.body.song;
        const imageFile = req.body.image;

        if(!songFile|| !imageFile){
            return res.status.json({message: "song and image both field required"});
        }

        const songUpload = await uploadFiles(songFile.buffer)
        const imageUpload = await uploadFiles(imageFile.buffer)

        const music = await musicModel.create({
            
            url: songUpload.url,
            image: imageUpload.url,
            title,
            artist: decoded.id
            
        })
            res.status(201).json({
            message: "music created successfully",
            music
        })

    }
    catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "user invalid",
            error
        })
    }

}

// get all songs 

const getAllMusic = async(req, res) => {
    try{
     const songs = await musicModel.find().populate("artist", "username");
     res.status(200).json(songs)
    }
    catch(err){
        return res.status(404).json({message: "user invalid", err})

    }
}


export default {createMusic, getAllMusic}