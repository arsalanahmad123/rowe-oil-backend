const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const ChartData = mongoose.model('ChartData', chartDataSchema);

module.exports = ChartData;
