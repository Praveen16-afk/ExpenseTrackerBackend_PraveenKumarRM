const mongoose = require('mongoose');
require('dotenv').config();

// CONNECTING TO MONGODB WITH HELP OF MONGOOSE
module.exports.connectDB = async (req, res) => {
    try {
        console.log("Connecting to db");
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log("MongoDB connection error: " + error);
    }
}