const Employee = require('../../models/employeeModel');

async function deleteEmployeeController(req, res) {
    try {
        const { id } = req.body;
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({
                message: 'Employee not found!',
                error: true,
                success: false,
                data: null,
            });
        }

        res.status(200).json({
            message: 'Employee deleted successfully!',
            error: false,
            success: true,
            data: deletedEmployee,
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

module.exports = deleteEmployeeController;
