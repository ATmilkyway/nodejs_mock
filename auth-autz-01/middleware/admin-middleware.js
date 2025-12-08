const isAdminUser = (req, res, next) => {
  if (!req.userInfo) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { role } = req.userInfo;

  if (role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You need admin privileges",
    });
  }

  next();
};

module.exports = isAdminUser;
