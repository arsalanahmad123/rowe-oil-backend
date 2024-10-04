const CalendarEvent = require('../../models/calenderEventModel');

async function updateEventController(req, res) {
    try {
        const { id } = req.params;
        const { title, start, end, color } = req.body;
        const updatedEvent = await CalendarEvent.findByIdAndUpdate(
            id,
            { title, start, end, color },
            { new: true }
        );
        res.status(200).json({
            message: 'Event updated successfully',
            error: false,
            success: true,
            data: updatedEvent,
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

module.exports = updateEventController;
