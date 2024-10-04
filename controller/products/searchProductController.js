const ProductModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    // Extract the page number from the request query
    const page = parseInt(req.query.page) || 1;

    // Pagination setup
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Query to fetch products with pagination
    const products = await ProductModel.find().skip(skip).limit(pageSize);

    // Count total documents
    const total = await ProductModel.countDocuments();

    // Prepare the response object
    const response = {
      data: products,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    // Send the response
    res.json(response);
  } catch (error) {
    console.error("Error in searchProduct:", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = searchProduct;
