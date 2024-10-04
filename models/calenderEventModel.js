const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    color: {
        type: String,
        default: 'rgba(51, 102, 255, 0.6)',
    },
});

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalendarEvent;
