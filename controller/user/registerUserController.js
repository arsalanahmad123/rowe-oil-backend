const bcrypt = require('bcryptjs');
const UserModel = require('../../models/userModel');

async function userRegistrationController(req, res) {
    const {
        email,
        salutation,
        firstName,
        surName,
        address,
        houseNumber,
        addressAddendum,
        postCode,
        city,
        country,
        password,
        primaryCustomerOrBusinessCustomer,
        accept,
    } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email',
                error: true,
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({
            email,
            salutation,
            firstName,
            surName,
            address,
            houseNumber,
            addressAddendum,
            postCode,
            city,
            country,
            password: hashedPassword,
            role: 'GENERAL',
            primaryCustomerOrBusinessCustomer:
                primaryCustomerOrBusinessCustomer || 'Primary Customer',
            accept,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            error: false,
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userRegistrationController;
