const TaskModel = require('../../models/toDoModel');

async function deleteTaskController(req, res) {
    try {
        const { id } = req.body;
        // console.log("id", id)
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found",
                error: true,
                success: false,
                data: null,
            });
        }

        res.status(200).json({
            message: "Task deleted successfully",
            error: false,
            success: true,
            data: deletedTask,
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

module.exports = deleteTaskController;
