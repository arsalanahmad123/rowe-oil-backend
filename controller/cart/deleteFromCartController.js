const CartModel = require("../../models/cartModel");

const deleteFromCartController = async (req, res) => {

    try {
        const userId = req.userId; // that's the user id 
        const { id } = req.body; // that's the product id

        // Find and delete the product in the cart
        const deleteProduct = await CartModel.findOneAndDelete({ userId, productId: id });

        if (!deleteProduct) {
            return res.status(404).json({
                message: "Product not found in cart",
                error: true,
                success: false,
            });
        }

        res.status(200).json({
            message: "Product deleted from cart",
            error: false,
            success: true,
            data: deleteProduct,
        });
    } catch (error) {
        // Handle errors
        res.status(400).json({
            message: error.message || "An error occurred",
            error: true,
            success: false,
        });
    }
}

module.exports = deleteFromCartController;
