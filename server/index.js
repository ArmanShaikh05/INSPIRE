import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import { NotFoundError } from "./errors/NotFoundError.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { profileRoutes } from "./routes/profileRoutes.js";
import userRoute from "./routes/user.route.js";
import alumniRoute from "./routes/alumni.route.js";
import instituteRoute from "./routes/institute.route.js";
import universityRoute from "./routes/university.route.js"
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";
 
dotenv.config();


const PORT = 3000;

const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));
app.use(errorHandler);

// yha pr apni api ayengi
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/fetch/",profileRoutes);
app.use("/api/v1/university",universityRoute)
app.use("/api/v1/alumni",alumniRoute)
app.use("/api/v1/institute",instituteRoute)


app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})


server.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});