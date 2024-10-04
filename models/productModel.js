const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        discountPrice: { type: Number, required: true },
        brand: { type: String, required: true },
        customerType: { type: String, required: true },
        images: { type: [String], default: [] },
        recommendations: {
            type: String,
        },
        eqeu: {
            type: String,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategory',
            required: true,
        },
        recommendedBy: { type: String },
        saleUnit: { type: Number, required: true },
        baseOils: { type: String },
        containerSizes: { type: [String], default: [] },
        viscosity: { type: String, required: true },
        articleNumber: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
