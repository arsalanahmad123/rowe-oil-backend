const mongoose = require('mongoose');

const addToCartSchema = new mongoose.Schema(
    {
        productId: String,
        quantity: Number,
        userId: String,
        selectedLitres: Number,
    },
    {
        timestamps: true,
    }
);

const CartModel = mongoose.model('Cart', addToCartSchema);
module.exports = CartModel;
