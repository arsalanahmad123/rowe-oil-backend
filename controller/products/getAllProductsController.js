const ProductModel = require('../../models/productModel');

async function getAllProductsController(req, res) {
    try {

        const allProducts = await ProductModel.find({});

        if (allProducts) {
            res.status(200).json({
                message: `All products fetched succesfully`,
                error: false,
                success: true,
                data: allProducts,
            });
        } else {
            res.status(404).json({
                message: `No Products Found`,
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

module.exports = getAllProductsController;
