const CalendarEvent = require('../../models/calenderEventModel');

async function deleteEventController(req, res) {
    try {
        const { id } = req.params;
        await CalendarEvent.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Event deleted successfully',
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

module.exports = deleteEventController;
