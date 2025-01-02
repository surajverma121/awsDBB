
import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGO_DB_URL || "mongodb+srv://suraj:Suraj121@cluster0.nywkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('mongodb connection failed', error);
        process.exit(1);
    }
};

export default connectDB;
