const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function initializeDatabase() {
    await mongoose
        .connect(process.env.MONGODB)
        .then(() => {
            console.log("Connected to database successfully.");
        })
        .catch((error) => {
            console.error("Failed to connect to database:", error);
        })
}

module.exports = { initializeDatabase };