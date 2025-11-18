require("dotenv").config();

const express = require("express");
const connectDb = require('./database/db')
const bookRoutes = require("./routes/bookRoutes");

const app = express();
connectDb()

// middleware for header with applicationtype: text/json
app.use(express.json()); // parses incoming requests with JSON payloads

app.use("/api/v1/books", bookRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is 🟢");
});
