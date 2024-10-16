import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
    cloud_name: "dszcc5332",
    api_key: "371686948435599",
    api_secret: "pCiVyQAyDdoBVPlAPRVLKfSRAHQ"
});
export default cloudinary;