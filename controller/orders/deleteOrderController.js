const Order = require('../../models/ordersModel');

async function deleteOrderController(req, res) {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Order.findOneAndDelete({ orderId });

        if (!deletedOrder) {
            return res.status(404).json({
                message: `Order with orderId ${orderId} not found.`,
                error: true,
                success: false,
                data: null,
            });
        }

        res.status(200).json({
            message: 'Order deleted successfully!',
            error: false,
            success: true,
            data: deletedOrder,
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

module.exports = deleteOrderController;
