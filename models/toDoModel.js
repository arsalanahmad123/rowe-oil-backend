const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do',
    },
});

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;
