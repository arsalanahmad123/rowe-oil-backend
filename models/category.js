const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        subcategories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subcategory',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
