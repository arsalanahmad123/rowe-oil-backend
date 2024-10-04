const ChartData = require('../../models/chartDataModel');

async function deleteChartDataController(req, res) {
    try {
        const { id } = req.params;
        await ChartData.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Chart data deleted successfully',
            error: false,
            success: true,
            data: null,
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

module.exports = deleteChartDataController;
