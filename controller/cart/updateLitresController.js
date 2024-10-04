const CartModel = require("../../models/cartModel");

const updateLitresController = async (req, res) => {
    try {
        const userId = req.userId; // that's the user id 
        const { productId, selectedLitres } = req.body;

        // Find the cart item by productId and userId and update the selectedLitres
        const updatedCart = await CartModel.findOneAndUpdate(
            { productId, userId },
            { selectedLitres },
            { new: true }
        );

        if (updatedCart) {
            res.json({
                message: "Selected litres updated successfully",
                error: false,
                success: true,
                data: updatedCart,
            });
        } else {
            res.status(404).json({
                message: "Cart item not found",
                error: true,
                success: false,
            });
        }
    } catch (error) {
        // Handle errors
        res.status(400).json({
            message: error.message || "An error occurred",
            error: true,
            success: false,
        });
    }
};

module.exports = updateLitresController;
