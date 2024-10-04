const ChartData = require('../../models/chartDataModel');

async function addChartDataController(req, res) {
    try {
        const { name, value } = req.body;
        const newChartData = new ChartData({ name, value });
        const savedChartData = await newChartData.save();
        res.status(201).json({
            message: 'Chart data added successfully',
            error: false,
            success: true,
            data: savedChartData,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
            data: null,
        });
    }
}

module.exports = addChartDataController;
