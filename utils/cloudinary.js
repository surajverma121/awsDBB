import {v2 as cloudinary} from 'cloudinary'
import dotenv from "dotenv"
dotenv.config({});

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    secret_key:process.env.SECRET_KEY
})

export default cloudinary;