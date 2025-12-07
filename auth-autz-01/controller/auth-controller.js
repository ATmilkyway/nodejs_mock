const User = require("../models/User.ts");
const bcrypt = require("bcryptjs");

// Register controller
const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Handle empty body
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Handle role
    if (role && !["user", "admin"].includes(role.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Role must be either 'user' or 'admin'",
      });
    }

    // Check if username exists
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "Username already exists, please use another username",
      });
    }

    // hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
      role: role || "user",
    });

    // Return response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Login contoller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Handle empty body
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "login successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { registerUser, loginUser };
