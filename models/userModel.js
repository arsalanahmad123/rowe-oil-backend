const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        salutation: {
            type: String,
        },
        firstName: {
            type: String,
            required: true,
        },
        surName: {
            type: String,
            required: true,
        },
        address: String,
        houseNumber: String,
        addressAddendum: String,
        postCode: String,
        city: String,
        country: String,
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'GENERAL',
        },
        primaryCustomerOrBusinessCustomer: {
            type: String,

            required: true,
        },
        accept: {
            type: Boolean,
            default: false,
        },
        isActive: Boolean,
        image: String,
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
