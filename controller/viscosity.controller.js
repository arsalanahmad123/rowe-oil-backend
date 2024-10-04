const Viscosity = require('../models/viscosity');
const Subcategory = require('../models/subcategory');

exports.createViscosity = async (req, res) => {
    try {
        const { name, subcategoryId } = req.body;

        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Invalid name provided.' });
        }
        if (!subcategoryId) {
            return res
                .status(400)
                .json({ error: 'Invalid subcategory ID provided.' });
        }

        const newViscosity = await Viscosity.create({
            name,
            subcategory: subcategoryId,
        });

        await Subcategory.findByIdAndUpdate(
            subcategoryId,
            { $addToSet: { viscosities: newViscosity._id } },
            { new: true }
        );

        return res.status(201).json(newViscosity);
    } catch (error) {
        console.error('Error creating viscosity:', error.message);
        return res.status(500).json({ error: 'Error creating viscosity.' });
    }
};

exports.deleteViscosity = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Invalid ID provided.' });
        }

        const viscosity = await Viscosity.findById(id);
        if (!viscosity) {
            return res.status(404).json({ error: 'Viscosity not found.' });
        }

        await Viscosity.deleteOne({ _id: id });

        await Subcategory.findByIdAndUpdate(
            viscosity.subcategory,
            { $pull: { viscosities: id } },
            { new: true }
        );

        return res
            .status(200)
            .json({ message: 'Viscosity deleted successfully.' });
    } catch (error) {
        console.error('Error deleting viscosity:', error.message);
        return res.status(500).json({ error: 'Error deleting viscosity.' });
    }
};

exports.getViscositiesBySubcategory = async (req, res) => {
    try {
        const { id: subcategoryId } = req.params;

        if (!subcategoryId) {
            return res
                .status(400)
                .json({ error: 'Invalid subcategory ID provided.' });
        }

        const viscosities = await Viscosity.find({
            subcategory: subcategoryId,
        });

        if (viscosities.length === 0) {
            return res.status(404).json({
                message: 'No viscosities found for this subcategory.',
            });
        }

        return res.status(200).json(viscosities);
    } catch (error) {
        console.error('Error retrieving viscosities:', error.message);
        return res.status(500).json({ error: 'Error retrieving viscosities.' });
    }
};
