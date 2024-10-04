const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const UserModel = require("../../models/userModel");

async function userLoginController(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist with this email",
        error: true,
        success: false,
      });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        error: true,
        success: false,
      });
    }

    // Generate JWT token
    const tokenData = {
      _id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "8h",
    });
    const tokenOption = {
      httpOnly: false,
      secure: true,
      sameSite: "None",
    };

    res.cookie("token", token, tokenOption);
    res.status(200).json({
      message: "logged In Successfully",
      data: token,
      error: false,
      success: true,
    });
    // then set the active to true
    const activeUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { isActive: true }
    );
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userLoginController;
