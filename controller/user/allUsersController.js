const UserModel = require('../../models/userModel');

async function allUsersController(req, res) {
    try {
        ///
        const allUsers = await UserModel.find();//array of all the users

        res.status(200).json({
            message: "All users",
            data: allUsers,
            success: true,
            error: false,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }

}

module.exports = allUsersController;