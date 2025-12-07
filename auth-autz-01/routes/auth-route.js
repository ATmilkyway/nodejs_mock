const express = require("express");
const { registerUser } = require("../controller/auth-controller");
const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Login route",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
