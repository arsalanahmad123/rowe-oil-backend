const UserModel = require("../../models/userModel");

async function userLogoutController(req, res) {
    try {
        const sessionUser = req.userId;
        await UserModel.findByIdAndUpdate(sessionUser, { isActive: false }, { new: true });
        res.clearCookie("token");
        res.json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: [],
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userLogoutController;
