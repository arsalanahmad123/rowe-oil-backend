const CartModel = require("../../models/cartModel");

const getUserCartController = async (req, res) => {
    //
    try {
        const currentUser = req.userId;
        // 
        console.log(currentUser)
        const allProducts = await CartModel.find({
            userId: currentUser
        });
        res.json({
            message: "FETCHED ALL THE CART PRODUCTS FOR THE CURRENT USER",
            error: false,
            success: true,
            data: allProducts,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || "An error occurred ",
            error: true,
            success: false,
        });
    }
}

module.exports = getUserCartController;