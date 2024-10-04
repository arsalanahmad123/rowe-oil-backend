const ChartData = require('../../models/chartDataModel');

async function getChartDataController(req, res) {
    try {
        const chartData = await ChartData.find();
        res.status(200).json({
            message: 'Chart data retrieved successfully',
            error: false,
            success: true,
            data: chartData,
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

module.exports = getChartDataController;
