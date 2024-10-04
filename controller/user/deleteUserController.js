const UserModel = require("../../models/userModel");

async function deleteUserController(req, res) {
  try {
    // console.log("id :: ", req.userId);
    const { id } = req.body;
    const user = await UserModel.findByIdAndDelete(id);
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User Deleted successfully",
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

module.exports = deleteUserController;
