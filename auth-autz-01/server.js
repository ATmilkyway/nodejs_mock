require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const authRoute = require("./routes/auth-route");
const homeRoute = require("./routes/home-route");
const adminRoute = require("./routes/admin-route");
const app = express();

app.use(express.json());
app.use(cors());

// connect DB
connectDB();

// routes
app.use("/api/", authRoute);
app.use("/home/", homeRoute);
app.use("/admin/", adminRoute);
app.get("/", (req, res) => {
  res.json({
    message: "Hello from backend",
  });
});
const PORT = process.env.PORT || 4000;

try {
  app.listen(PORT, () => {
    console.log("Server 🟢:", PORT);
  });
} catch (error) {
  console.log("Server 🛑", error.message);
}
