const CartModel = require("../../models/cartModel");

const updateCartController = async (req, res) => {
    try {
        const userId = req.userId; // that's the user id 
        const { id, quantity, selectedLitres } = req.body; // that's the product id

        // Validate quantity
        if (quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1",
                error: true,
                success: false,
            });
        }

        // Find the product in the cart
        const cartProduct = await CartModel.findOne({ userId, productId: id });

        if (!cartProduct) {
            return res.status(404).json({
                message: "Product not found in cart",
                error: true,
                success: false,
            });
        }

        // Update the quantity
        cartProduct.quantity = quantity;
        await cartProduct.save();

        res.status(200).json({
            message: "Cart updated successfully",
            error: false,
            success: true,
            data: cartProduct,
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

module.exports = updateCartController;
