const Employee = require('../../models/employeeModel');

async function getAllEmployeesController(req, res) {
    try {
        const employees = await Employee.find();
        res.status(200).json({
            message: 'Employees fetched successfully!',
            error: false,
            success: true,
            data: employees,
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

module.exports = getAllEmployeesController;
