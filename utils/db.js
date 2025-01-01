import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Mongodb connected succesfully");
        
        
    } catch (error) {
        console.log("mongodb connection failed",error);
        
    }
}

export default connectDB;