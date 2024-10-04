const Category = require('../models/category');
const Subcategory = require('../models/subcategory');

const slugify = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const slug = slugify(name);

        const category = new Category({ name, slug });
        await category.save();

        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('subcategories');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate(
            'subcategories'
        );
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true, runValidators: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await Subcategory.deleteMany({ category: category._id });

        await Category.findByIdAndDelete(req.params.id);

        res.status(204).send(); // No content, deletion was successful
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
