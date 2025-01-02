import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const connectDB=async()=>{
    try {
        
        await mongoose.connect("mongodb+srv://suraj:Suraj121@cluster0.nywkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Mongodb connected  suraj succesfully");
        
        
    } catch (error) {
        console.log("mongodb connection failed",error);
        
    }
}

export default connectDB;
