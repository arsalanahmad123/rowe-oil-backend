const bcrypt = require('bcryptjs');
const UserModel = require('../../models/userModel');

async function getAllCustomersController(req, res) {

    try {    // Check if the user already exists
        const allCustomers = await UserModel.find({ isEmployee: false });

        res.status(202).json({
            message: "All customers fetched",
            error: false,
            success: true,
            data: allCustomers,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
            data: null,
        });
    }
}

module.exports = getAllCustomersController;
