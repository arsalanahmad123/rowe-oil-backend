const CalendarEvent = require('../../models/calenderEventModel');

async function getEventsController(req, res) {
    try {
        const events = await CalendarEvent.find();
        res.status(200).json({
            message: 'Events retrieved successfully',
            error: false,
            success: true,
            data: events,
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

module.exports = getEventsController;
