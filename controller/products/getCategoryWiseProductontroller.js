const CategoryModel = require('../../models/category');
const ProductModel = require('../../models/productModel');

async function getCategoryWiseProductsController(req, res) {
    try {
        const { category: slug } = req.body; // Get the slug from the request body
        const page = parseInt(req.query.page) || 1; // Get page number from query params
        const pageSize = 10; // Number of items per page

        // Calculate the number of documents to skip
        const skip = (page - 1) * pageSize;

        // Find the category by its slug
        const category = await CategoryModel.findOne({ slug });

        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                error: true,
                success: false,
                data: null,
            });
        }

        // Fetch the products with pagination based on the category ID
        const allProducts = await ProductModel.find({ category: category._id })
            .skip(skip)
            .limit(pageSize)
            .populate(['category', 'subcategory']);

        // Count total number of products for the given category
        const total = await ProductModel.countDocuments({
            category: category._id,
        });

        if (allProducts.length > 0) {
            res.status(200).json({
                message: 'Products fetched successfully',
                error: false,
                success: true,
                data: allProducts,
                pagination: {
                    total,
                    page,
                    pages: Math.ceil(total / pageSize),
                },
            });
        } else {
            res.status(404).json({
                message: 'No Products Found',
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

module.exports = getCategoryWiseProductsController;
