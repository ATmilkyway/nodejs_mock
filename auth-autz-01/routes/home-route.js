const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  const user = req.userInfo;

  res.status(200).json({
    success: true,
    message: `Welcome to our platform page, ${user.username}`,
    data: {
      userId: user.userId,
      username: user.username,
      role: user.role,
    },
  });
});

module.exports = router;
