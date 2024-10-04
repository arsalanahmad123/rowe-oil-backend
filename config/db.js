const mongoose = require("mongoose");

async function connectDb() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log("error connecting to the database");
    }
}

module.exports = connectDb;