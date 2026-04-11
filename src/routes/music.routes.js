import express from "express"
import musicController from "../controllers/music.controller.js"
import multer from "multer";

const router = express.Router()
const upload = multer()

router.post('/upload',upload.fields([{name: "song", maxcount: 1},{name: "image", maxcount: 1}]), musicController.createMusic);
router.post('/', musicController.getAllMusic)


export default router