const CalendarEvent = require('../../models/calenderEventModel');

async function addEventController(req, res) {
    try {
        const { title, start, end, color } = req.body;
        const newEvent = new CalendarEvent({ title, start, end, color });
        const savedEvent = await newEvent.save();
        res.status(201).json({
            message: 'Event added successfully',
            error: false,
            success: true,
            data: savedEvent,
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

module.exports = addEventController;
