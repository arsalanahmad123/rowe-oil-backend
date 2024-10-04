const ChartData = require('../../models/chartDataModel');

async function updateChartDataController(req, res) {
    try {
        const { id } = req.params;
        const { name, value } = req.body;
        const updatedChartData = await ChartData.findByIdAndUpdate(
            id,
            { name, value },
            { new: true }
        );
        res.status(200).json({
            message: 'Chart data updated successfully',
            error: false,
            success: true,
            data: updatedChartData,
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

module.exports = updateChartDataController;
