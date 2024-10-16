import express from "express";
 import isAuthenticated from "../../../INSPIRE/server/middlewares/isAuthenticated.js";
import upload from "../../../INSPIRE/server/middlewares/multer.js";
import { getMessage, sendMessage } from "../../../INSPIRE/server/controllers/message.controller.js";

const router = express.Router();

router.route('/send/:id').post(isAuthenticated, sendMessage);
router.route('/all/:id').get(isAuthenticated, getMessage);
 
export default router;