import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import cors from "cors"
import musicRoutes from "./routes/music.routes.js"

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://playmuzeek.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());  
app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes)


export default app;