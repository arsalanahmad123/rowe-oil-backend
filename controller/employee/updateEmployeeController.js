const Employee = require('../../models/employeeModel');

async function updateEmployeeController(req, res) {
    try {
        const { id } = req.body;
        const { firstName, lastName, email, role, gender } = req.body;

        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            role: role || 'General',
            gender: gender || 'Mr',
        }, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({
                message: 'Employee not found!',
                error: true,
                success: false,
                data: null,
            });
        }

        res.status(200).json({
            message: 'Employee updated successfully!',
            error: false,
            success: true,
            data: updatedEmployee,
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

module.exports = updateEmployeeController;
