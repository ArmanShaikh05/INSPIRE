import express from "express";
import {getSingleProfile} from "../controllers/profileController.js";

const router = express.Router();

router.post("/profile", getSingleProfile);

export {router as profileRoutes};
