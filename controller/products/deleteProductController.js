const ProductModel = require('../../models/productModel');

async function deleteProductController(req, res) {
    try {
        const { productId } = req.body;

        // Check if productId is provided
        if (!productId) {
            return res.status(400).json({
                message: 'Product ID is required for deletion',
                error: true,
                success: false,
                data: null,
            });
        }

        // Find the product by ID and delete it
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                message: `Product with ID ${productId} not found`,
                error: true,
                success: false,
                data: null,
            });
        }

        res.status(200).json({
            message: `Product with ID ${productId} deleted successfully`,
            error: false,
            success: true,
            data: deletedProduct,
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

module.exports = deleteProductController;
