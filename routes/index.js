const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
//
const userSignUpController = require('../controller/user/registerUserController');
const userSignInController = require('../controller/user/loginUserController');
const userDetailController = require('../controller/user/userDetailController');
const userLogoutController = require('../controller/user/logoutUserController');
const allUserController = require('../controller/user/allUsersController');
//
const addProductController = require('../controller/products/addProductController');
const updateProductController = require('../controller/products/updateProductController');
const getAllProductsController = require('../controller/products/getAllProductsController');
const deleteProductController = require('../controller/products/deleteProductController');
const searchProductController = require('../controller/products/searchProduct');
//
const addOrderController = require('../controller/orders/addOrderController');
const deleteOrderController = require('../controller/orders/deleteOrderController');
const getAllOrdersController = require('../controller/orders/getAllOrdersController');
const getOrderByIdController = require('../controller/orders/getOrderByIdController');
const updateOrderController = require('../controller/orders/updateOrderController');

//
const addEmployeeController = require('../controller/employee/addEmployeeController');
const deleteEmployeeController = require('../controller/employee/deleteEmployeeController');
const getAllEmployeesController = require('../controller/employee/getAllEmployeesController');
const getEmployeeByIdController = require('../controller/employee/getEmployeeByIdController');
const updateEmployeeController = require('../controller/employee/updateEmployeeController');

//
const addTaskController = require('../controller/toDos/addTaskController');
const deleteTaskController = require('../controller/toDos/deleteTaskController');
const updateTaskController = require('../controller/toDos/updateTaskController');
const getAllTasksController = require('../controller/toDos/getAllTasksController');

//
const addChartDataController = require('../controller/chart/addChartDataController');
const deleteChartDataController = require('../controller/chart/deleteChartDataController');
const updateChartDataController = require('../controller/chart/updateChartDataController');

//
const addEventController = require('../controller/calendar/addEventController');
const deleteEventController = require('../controller/calendar/deleteEventController');
const getEventsController = require('../controller/calendar/getEventsController');
const updateEventController = require('../controller/calendar/updateEventController');

//
const addToCartController = require('../controller/cart/addToCartController');
const countCartProductsController = require('../controller/cart/countCartProductsController');
const deleteFromCartController = require('../controller/cart/deleteFromCartController');
const getUserCartController = require('../controller/cart/getUserCartController');
const updateInCartController = require('../controller/cart/updateInCartController');
const updateLitresController = require('../controller/cart/updateLitresController');

//
const authToken = require('../middleware/authToken');
const getCategoryWiseProductsController = require('../controller/products/getCategoryWiseProductontroller');
const getProductById = require('../controller/products/getProductById');
const createCheckoutSession = require('../controller/stripe/createCheckoutSessionController');
const updateUserController = require('../controller/user/updateUserController');
const updateUserById = require('../controller/user/updateUserById');
const deleteUserController = require('../controller/user/deleteUserController');

const subcategoryController = require('../controller/subcategory.controller');
const categoryController = require('../controller/category.controller');

const viscosityController = require('../controller/viscosity.controller');

const router = express.Router();

//here will be all the routes
// user
router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get('/user-details', authToken, userDetailController);
router.get('/logout', authToken, userLogoutController);
router.get('/all-users', allUserController);
router.put('/update-user', authToken, updateUserController);
router.put('/update-user-by-id', updateUserById);
router.delete('/delete-user', deleteUserController);
// Products
router.post('/add-product', upload.array('images'), addProductController);
router.put('/update-product', updateProductController);
router.delete('/delete-product', deleteProductController);
router.get('/get-all-products', getAllProductsController);
router.post('/get-category-wise-products', getCategoryWiseProductsController);
router.post('/get-product-by-id', getProductById);
router.get('/search-product', searchProductController);

// Orders
router.post('/add-order', addOrderController);
router.delete('/delete-order', deleteOrderController);
router.get('/get-all-orders', getAllOrdersController);
router.get('/get-order-by-id', getOrderByIdController);
router.put('/update-order', updateOrderController);

// Employees
router.post('/add-employee', addEmployeeController);
router.delete('/delete-employee', deleteEmployeeController);
router.get('/get-all-employees', getAllEmployeesController);
router.get('/get-employee-by-id', getEmployeeByIdController);
router.put('/update-employee', updateEmployeeController);

// Tasks
router.post('/add-task', addTaskController);
router.delete('/delete-task', deleteTaskController);
router.put('/update-task', updateTaskController);
router.get('/get-all-tasks', getAllTasksController);

// Chart Data
router.post('/add-chart', addChartDataController);
router.delete('/delete-chart', deleteChartDataController);
router.put('/update-chart', updateChartDataController);

// Calendar Events
router.post('/add-event', addEventController);
router.delete('/delete-event', deleteEventController);
router.get('/get-events', getEventsController); // Assuming this is for fetching events
router.put('/update-event', updateEventController);

// add to cart
router.post('/add-to-cart', authToken, addToCartController);
router.get('/count-cart-products', authToken, countCartProductsController);
router.get('/view-user-cart-products', authToken, getUserCartController);
router.post('/update-cart-product', authToken, updateInCartController);
router.post('/delete-cart-product', authToken, deleteFromCartController);
router.put('/update-litres', authToken, updateLitresController);

// payment
router.post('/create-checkout-session', createCheckoutSession);

// CRUD Routes for Categories
router.post('/categories', authToken, categoryController.createCategory);
router.get('/categories', authToken, categoryController.getAllCategories);
router.get('/categories/:id', authToken, categoryController.getCategoryById);
router.put('/categories/:id', authToken, categoryController.updateCategory);
router.delete('/categories/:id', authToken, categoryController.deleteCategory);

// CRUD Routes for Subcategories
router.post(
    '/subcategories',
    authToken,
    subcategoryController.createSubcategory
);
router.get(
    '/subcategories',
    authToken,
    subcategoryController.getAllSubcategories
);
router.get(
    '/subcategories/:id',
    authToken,
    subcategoryController.getSubcategoryById
);
router.put(
    '/subcategories/:id',
    authToken,
    subcategoryController.updateSubcategory
);
router.delete(
    '/subcategories/:id',
    authToken,
    subcategoryController.deleteSubcategory
);

router.post('/viscosity', authToken, viscosityController.createViscosity);
router.get(
    '/viscosity/:id',
    authToken,
    viscosityController.getViscositiesBySubcategory
);
router.delete('/viscosity/:id', authToken, viscosityController.deleteViscosity);

module.exports = router;
