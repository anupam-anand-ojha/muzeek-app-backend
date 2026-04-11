import express from "express"
import musicController from "../controllers/music.controller.js"

const router = express.Router()

router.post('/upload', musicController.createMusic);
router.post('/', musicController.getAllMusic)


export default router