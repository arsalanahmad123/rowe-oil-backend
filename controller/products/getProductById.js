const ProductModel = require('../../models/productModel');

async function getProductById(req, res) {
    try {
        const { id } = req.body;
        // console.log(category)
        const idProduct = await ProductModel.find({ _id: id });
        // console.log(category, idProduct)
        if (idProduct) {
            res.status(200).json({
                message: `fetched product with the given id`,
                error: false,
                success: true,
                data: idProduct,
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

module.exports = getProductById;
