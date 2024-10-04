const CartModel = require("../../models/cartModel");

const countCartProductsController = async (req, res) => {
    try {
        const userId = req.userId;
        const count = await CartModel.countDocuments({
            userId: userId,
        })
        //
        res.json({
            message: "COUNTS OF THE CART DATA OF THE CURRENT USER",
            error: false,
            success: true,
            data: {
                count: count
            }
        })
    } catch (error) {
        // Handle errors
        res.status(400).json({
            message: error.message || "An error occurred ",
            error: true,
            success: false,
        });
    }
}
module.exports = countCartProductsController;