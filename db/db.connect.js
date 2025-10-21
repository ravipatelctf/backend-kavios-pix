import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function initializeDatabase() {
    await mongoose
        .connect(process.env.MONGODB)
        .then(() => {
            console.log("Connected to database successfully.");
        })
        .catch((error) => {
            console.error("Failed to connect to database:", error);
        })
}