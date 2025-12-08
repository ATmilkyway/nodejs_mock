const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  if (!req.userInfo) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User information missing",
    });
  }

  const { userId, username, role } = req.userInfo;

  res.status(200).json({
    success: true,
    message: "Welcome to admin page",
    data: { userId, username, role },
  });
});

module.exports = router;
