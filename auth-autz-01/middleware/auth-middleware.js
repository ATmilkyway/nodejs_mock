const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({
      success: false,
      message: "Please provide your token",
    });
  }

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      success: false,
      message: "Invalid authorization header format",
    });
  }

  const token = parts[1];

  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userInfo = decodedTokenInfo;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
