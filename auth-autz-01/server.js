require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const authRoute = require("./routes/auth-route");

const app = express();

app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/", authRoute);

const PORT = process.env.PORT || 4000;

try {
  app.listen(PORT, () => {
    console.log("Server 🟢");
  });
} catch (error) {
  console.log("Server 🛑", error.message);
}
