require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("DB is 🟢");
  } catch (error) {
    console.log("Database 🛑", error.message);
  }
};

connectDB();
