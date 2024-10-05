const productModel = require('../../models/productModel');

const searchProductController = async (req, res) => {
    try {
        const query = req.query.q;
        console.log('query :: ', query);

        const regex = new RegExp(query, 'i');

        const products = await productModel.find({ title: regex });

        res.json({
            message: 'FETCHED THE SEARCH PRODUCTS',
            error: false,
            success: true,
            data: products,
        });
    } catch (error) {
        // Handle any errors and send an error response
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = searchProductController;
