const Order = require('../../models/ordersModel');

async function addOrderController(req, res) {
    try {
        const { orderId, customerName, orderDate, amount, status } = req.body;

        // Check if order with the same orderId already exists
        const existingOrder = await Order.findOne({ orderId });
        if (existingOrder) {
            return res.status(400).json({
                message: `Order with orderId ${orderId} already exists.`,
                error: true,
                success: false,
                data: null,
            });
        }

        const newOrder = new Order({
            orderId,
            customerName,
            orderDate,
            amount,
            status,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({
            message: 'Order added successfully!',
            error: false,
            success: true,
            data: savedOrder,
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

module.exports = addOrderController;
