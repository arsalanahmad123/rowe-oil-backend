const mongoose = require('mongoose');

const viscositySchema = new mongoose.Schema({
    name: { type: String, required: true },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true,
    },
});

const Viscosity = mongoose.model('Viscosity', viscositySchema);

module.exports = Viscosity;
