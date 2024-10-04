const Employee = require('../../models/employeeModel');

async function getEmployeeByIdController(req, res) {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found!',
                error: true,
                success: false,
                data: null,
            });
        }
        res.status(200).json({
            message: 'Employee found!',
            error: false,
            success: true,
            data: employee,
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

module.exports = getEmployeeByIdController;
