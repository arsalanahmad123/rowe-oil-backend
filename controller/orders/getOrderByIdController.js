const Order = require('../../models/ordersModel');

async function getOrderByIdController(req, res) {
    try {
        const orderId = req.params.id;
        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({
                message: `Order with orderId ${orderId} not found.`,
                error: true,
                success: false,
                data: null,
            });
        }

        res.status(200).json({
            message: 'Order found!',
            error: false,
            success: true,
            data: order,
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

module.exports = getOrderByIdController;
