import express from "express"
import musicController from "../controllers/music.controller.js"
import multer from "multer";

const router = express.Router()
const upload = multer()

router.post('/upload',upload.fields([{name: "song", maxCount: 1},{name: "image", maxCount: 1}]), musicController.createMusic);
router.get('/', musicController.getAllMusic)


export default router