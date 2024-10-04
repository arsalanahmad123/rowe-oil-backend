const ProductModel = require('../../models/productModel');
const CategoryModel = require('../../models/category');
const SubcategoryModel = require('../../models/subcategory');

const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function addProductController(req, res) {
    try {
        const {
            title,
            price,
            discountPrice,
            brand,
            customerType,
            category,
            subcategory,
            containerSizes,
            recommendedBy,
            recommendations,
            eqeu,
            saleUnit,
            baseOils,
            description,
            viscosity,
            articleNumber,
        } = req.body;

        // Validate category and subcategory
        const categoryExists = await CategoryModel.findById(category);
        if (!categoryExists) {
            return res.status(400).json({
                message: 'Category not found',
                error: true,
                success: false,
            });
        }

        const subcategoryExists = await SubcategoryModel.findById(subcategory);
        if (!subcategoryExists) {
            return res.status(400).json({
                message: 'Subcategory not found',
                error: true,
                success: false,
            });
        }

        // Create a new product instance using the ProductModel schema
        const newProduct = new ProductModel({
            title,
            price,
            discountPrice,
            brand,
            customerType,
            images: [],
            category,
            subcategory,
            containerSizes,
            recommendedBy,
            recommendations,
            eqeu,
            saleUnit,
            baseOils,
            description,
            viscosity,
            articleNumber,
        });

        // Save the product first to generate an ID
        const savedProduct = await newProduct.save();

        if (req.files && req.files.length > 0) {
            const uploadedImages = [];

            for (const file of req.files) {
                const uploadResponse = await imagekit.upload({
                    file: file.buffer,
                    fileName: `${title}_${Date.now()}`,
                    folder: '/products',
                });

                uploadedImages.push(uploadResponse.url);
            }

            savedProduct.images = uploadedImages;
            await savedProduct.save();
        } else {
            // If no images, delete the product
            await savedProduct.deleteOne();
            return res.status(400).json({
                message: 'No images provided or image uploading failed',
                error: true,
                success: false,
                data: [],
            });
        }

        res.status(200).json({
            message: 'Product added successfully',
            error: false,
            success: true,
            data: savedProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error); // Log the error for debugging
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
            data: null,
        });
    }
}

module.exports = addProductController;
