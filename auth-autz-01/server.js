require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");

const app = express();

app.use(express.json());

// connect DB
connectDB();

const PORT = process.env.PORT || 3000;

try {
  app.listen(PORT, () => {
    console.log("Server 🟢");
  });
} catch (error) {
  console.log("Server 🛑", error.message);
}
