import express from "express"
import musicController from "../controllers/music.controller.js"
import multer from "multer";

const router = express.Router()

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post(
  '/upload',
  upload.fields([
    { name: "song", maxCount: 1 },
    { name: "image", maxCount: 1 }
  ]),
  musicController.createMusic
);

router.get('/', musicController.getAllMusic)

export default router