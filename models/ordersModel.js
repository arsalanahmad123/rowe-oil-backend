const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Shipped', 'Pending', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
