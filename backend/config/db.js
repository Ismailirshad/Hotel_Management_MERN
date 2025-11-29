import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB conencted successfully")
    } catch (error) {
        console.log("Failed to connect", error)
        
    }
}
export default connectDb;