const TaskModel = require('../../models/toDoModel');

async function updateTaskController(req, res) {
    try {
        const { id } = req.body;
        console.log(id)
        const { content, status } = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            { content, status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found",
                error: true,
                success: false,
                data: null,
            });
        }

        res.status(200).json({
            message: "Task updated successfully",
            error: false,
            success: true,
            data: updatedTask,
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

module.exports = updateTaskController;
