    require("dotenv").config();
    const express = require("express");

    const app = express();

    app.use(express.json());

    const PORT = process.env.PORT || 3000;

    try {
    app.listen(PORT, () => {
        console.log("Server 🟢");
    });
    } catch (error) {
    console.log("Server 🛑", error.message);
    }
