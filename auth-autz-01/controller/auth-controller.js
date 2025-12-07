const User = require("../models/User.ts");

// Register controller
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Handle empty body
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
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

    // Create new user
    const newUser = await User.create({
      username: username,
      password: password, // Plain text for now
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

module.exports = { registerUser };
