const UserModel = require("../../models/userModel");

async function userDetailController(req, res) {
  try {
    // console.log("id :: ", req.userId);
    const user = await UserModel.findById(req.userId);

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User Detail",
    });
    // console.log(user);
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailController;
