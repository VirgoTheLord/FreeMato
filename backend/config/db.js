import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  const token = process.env.DB_URL;
  await mongoose.connect(token).then(() => {
    console.log("Database connected successfully");
  });
};
