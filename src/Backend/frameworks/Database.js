import mongoose from "mongoose";

const connectDB = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI); 
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); 
    }
};

export default connectDB;
