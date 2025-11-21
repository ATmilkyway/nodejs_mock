require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const router = require("./routes/books");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/books", router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server 🟢");
});
