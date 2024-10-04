const productModel = require("../../models/productModel");

const searchProductController = async (req, res) => {
  try {
    // Get the search query from the request
    const query = req.query.q;
    console.log("query :: ", query);

    // Create a regex pattern for case-insensitive and global search
    const regex = new RegExp(query, "i"); // 'i' for case insensitive

    // Search the product model for matches in productName or category fields
    const product = await productModel.find({
      $or: [
        { title: regex },
        { category: regex },
        { customerType: regex },
        { viscosity: regex },
        { recommendedBy: regex },
        { articleNumber: regex },
        { approvedFor: regex },
      ],
    });

    // Send a successful response with the search results
    res.json({
      message: "FETCHED THE SEARCH PRODUCTS",
      error: false,
      success: true,
      data: product,
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
