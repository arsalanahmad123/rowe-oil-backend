const Order = require('../../models/ordersModel');
async function getAllOrdersController(req, res) {
    try {
        const orders = await Order.find();
        res.status(200).json({
            message: 'Orders fetched successfully!',
            error: false,
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
            data: null,
        });
    }
}

module.exports = getAllOrdersController;
