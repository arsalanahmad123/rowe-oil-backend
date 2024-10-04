const TaskModel = require('../../models/toDoModel');

async function getAllTasksController(req, res) {
    try {

        const allTasks = await TaskModel.find();

        if (!allTasks) {
            return res.status(404).json({
                message: "Task not found",
                error: true,
                success: false,
                data: null,
            });
        }

        res.status(200).json({
            message: "All Tasks fetched",
            error: false,
            success: true,
            data: allTasks,
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

module.exports = getAllTasksController;
