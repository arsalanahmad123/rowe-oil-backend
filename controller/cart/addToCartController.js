const CartModel = require("../../models/cartModel");

const addToCartController = async (req, res) => {
    try {
        const { productId, selectedLitres } = req.body;
        const sessionUser = req.userId; // Assuming req.userId is set elsewhere

        // Check if product is already in the cart
        const isProductAvailable = await CartModel.findOne({ productId, userId: sessionUser });

        if (isProductAvailable) {
            return res.status(200).json({
                message: "Product already exists in the cart",
                success: false,
                error: true,
            });
        }

        // Create new product payload
        const newProduct = new CartModel({
            productId: productId,
            quantity: 1,
            userId: sessionUser,
            selectedLitres: selectedLitres,
        });

        // Save the new product to database
        const savedProduct = await newProduct.save();

        // Respond with success message
        res.status(201).json({
            message: "Product added to cart successfully",
            error: false,
            success: true,
            data: savedProduct, // Optionally, you can send back the saved product data
        });
    } catch (error) {
        // Handle errors
        res.status(400).json({
            message: error.message || "An error occurred while adding product to cart",
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartController;
