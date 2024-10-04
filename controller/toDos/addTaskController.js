const TaskModel = require('../../models/toDoModel');

async function addTaskController(req, res) {
    try {
        const { content, status } = req.body;

        if (!content) {
            return res.status(400).json({
                message: "Content is required",
                error: true,
                success: false,
                data: null,
            });
        }

        const newTask = new TaskModel({
            content,
            status: status || 'To Do',
        });

        await newTask.save();

        res.status(201).json({
            message: "Task created successfully",
            error: false,
            success: true,
            data: newTask,
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

module.exports = addTaskController;
