const Order = require('../../models/ordersModel');

async function updateOrderController(req, res) {
    try {
        const orderId = req.params.id;
        const { customerName, orderDate, amount, status } = req.body;

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            { customerName, orderDate, amount, status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: `Order with orderId ${orderId} not found.`,
                error: true,
                success: false,
                data: null,
            });
        }

        res.status(200).json({
            message: 'Order updated successfully!',
            error: false,
            success: true,
            data: updatedOrder,
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

module.exports = updateOrderController;
