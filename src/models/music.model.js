import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
    url:{
        type: String
    },
    image:{
        type: String,

    },
    title:{
        type:String,
        require: true
    },
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

})

const musicModel = mongoose.model("music", musicSchema);

export default musicModel