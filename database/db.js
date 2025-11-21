require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("DB 🟢");
  } catch (error) {
    console.log("DB 🛑", error.message);
  }
};

module.exports = connectDB;
