require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/books", bookRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server 🟢");
});
