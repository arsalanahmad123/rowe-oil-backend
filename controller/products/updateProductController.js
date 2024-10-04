const ProductModel = require('../../models/productModel');

async function updateProductController(req, res) {
    try {
        const { productId } = req.body; // Assuming the product ID is passed in the body

        const {
            title,
            price,
            discountPrice,
            brand,
            customerType,
            images,
            category,
            subcategory, // Add subcategory handling
            recommendedBy,
            recommendations, // Include recommendations
            eqeu, // Include eqeu
            saleUnit,
            baseOils,
            description,
            containerSizes, // Handle containerSizes array
            viscosity,
            articleNumber,
        } = req.body;

        // Create payload with updated fields (Only include fields that are present in req.body)
        const payload = {
            ...(title && { title }),
            ...(price && { price }),
            ...(discountPrice && { discountPrice }),
            ...(brand && { brand }),
            ...(customerType && { customerType }),
            ...(images && { images }),
            ...(category && { category }),
            ...(subcategory && { subcategory }), // Update subcategory if provided
            ...(recommendedBy && { recommendedBy }),
            ...(recommendations && { recommendations }), // Add recommendations
            ...(eqeu && { eqeu }), // Add eqeu
            ...(saleUnit && { saleUnit }),
            ...(baseOils && { baseOils }),
            ...(description && { description }),
            ...(containerSizes && { containerSizes }), // Handle containerSizes array
            ...(viscosity && { viscosity }),
            ...(articleNumber && { articleNumber }),
        };

        // Update the product in the database
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            payload,
            { new: true }
        );

        if (updatedProduct) {
            res.status(200).json({
                message: `Product with ID ${productId} updated successfully`,
                error: false,
                success: true,
                data: updatedProduct,
            });
        } else {
            res.status(404).json({
                message: `Product with ID ${productId} not found`,
                error: true,
                success: false,
                data: null,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
            data: null,
        });
    }
}

module.exports = updateProductController;
