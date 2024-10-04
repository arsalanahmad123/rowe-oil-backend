const Subcategory = require('../models/subcategory');
const Category = require('../models/category');

const checkCategoryExists = async (categoryId) => {
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new Error('Category not found');
    }
};

exports.createSubcategory = async (req, res) => {
    const { name, category } = req.body;

    try {
        await checkCategoryExists(category);

        const subcategory = new Subcategory({ name, category });
        await subcategory.save();

        await Category.findByIdAndUpdate(
            category,
            { $push: { subcategories: subcategory._id } },
            { new: true }
        );

        res.status(201).json(subcategory);
    } catch (error) {
        if (error.message === 'Category not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
};

exports.getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate([
            'category',
            'viscosities',
        ]);
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id).populate(
            'category'
        );
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSubcategory = async (req, res) => {
    const { name, category } = req.body;

    try {
        await checkCategoryExists(category);

        const subcategory = await Subcategory.findByIdAndUpdate(
            req.params.id,
            { name, category },
            { new: true, runValidators: true }
        );
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.status(200).json(subcategory);
    } catch (error) {
        if (error.message === 'Category not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id);
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        await Category.findByIdAndUpdate(subcategory.category, {
            $pull: { subcategories: subcategory._id },
        });

        await Subcategory.findByIdAndDelete(req.params.id);

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
