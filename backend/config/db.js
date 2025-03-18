import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://greatstack:9344804104@cluster0.2tcwo.mongodb.net/laxnas-kitchen').then(()=>console.log("DB connected"));
};

