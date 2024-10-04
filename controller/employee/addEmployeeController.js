const bcrypt = require('bcryptjs');
const Employee = require('../../models/employeeModel');

async function addEmployeeController(req, res) {
    try {
        const { firstName, lastName, email, role, gender, password } = req.body;

        // Check if email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({
                message: 'Employee with this email already exists!',
                error: true,
                success: false,
                data: null,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new employee instance with hashed password
        const newEmployee = new Employee({
            firstName,
            lastName,
            email,
            role: role || 'General',
            gender: gender || 'Mr',
            password: hashedPassword,
        });

        // Save the new employee to the database
        const savedEmployee = await newEmployee.save();

        res.status(201).json({
            message: 'Employee added successfully!',
            error: false,
            success: true,
            data: savedEmployee,
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

module.exports = addEmployeeController;
