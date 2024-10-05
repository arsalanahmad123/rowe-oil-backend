const ProductModel = require('../../models/productModel');
const CategoryModel = require('../../models/category');
const SubcategoryModel = require('../../models/subcategory');
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function updateProductController(req, res) {
    try {
        const { productId } = req.body;

        const {
            title,
            price,
            discountPrice,
            brand,
            customerType,
            category,
            subcategory,
            recommendedBy,
            recommendations,
            eqeu,
            saleUnit,
            baseOils,
            description,
            containerSizes,
            viscosity,
            articleNumber,
        } = req.body;

        if (category) {
            const categoryExists = await CategoryModel.findById(category);
            if (!categoryExists) {
                return res.status(400).json({
                    message: 'Category not found',
                    error: true,
                    success: false,
                });
            }
        }

        if (subcategory) {
            const subcategoryExists = await SubcategoryModel.findById(
                subcategory
            );
            if (!subcategoryExists) {
                return res.status(400).json({
                    message: 'Subcategory not found',
                    error: true,
                    success: false,
                });
            }
        }

        const payload = {
            ...(title && { title }),
            ...(price && { price }),
            ...(discountPrice && { discountPrice }),
            ...(brand && { brand }),
            ...(customerType && { customerType }),
            ...(category && { category }),
            ...(subcategory && { subcategory }),
            ...(recommendedBy && { recommendedBy }),
            ...(recommendations && { recommendations }),
            ...(eqeu && { eqeu }),
            ...(saleUnit && { saleUnit }),
            ...(baseOils && { baseOils }),
            ...(description && { description }),
            ...(containerSizes && { containerSizes }),
            ...(viscosity && { viscosity }),
            ...(articleNumber && { articleNumber }),
        };

        const updatedProduct = await ProductModel.findById(productId);
        if (!updatedProduct) {
            return res.status(404).json({
                message: `Product with ID ${productId} not found`,
                error: true,
                success: false,
                data: null,
            });
        }

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

            updatedProduct.images.push(...uploadedImages);
        }

        Object.assign(updatedProduct, payload);

        const savedProduct = await updatedProduct.save();

        res.status(200).json({
            message: `Product with ID ${productId} updated successfully`,
            error: false,
            success: true,
            data: savedProduct,
        });
    } catch (error) {
        console.error('Error updating product:', error); // Log the error for debugging
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
            data: null,
        });
    }
}

module.exports = updateProductController;
