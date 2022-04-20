const { body } = require('express-validator');
const taskValidations = [
    body("task").not().isEmpty().withMessage("Task Cannot be Empty").isString().withMessage("Task Should be a Stirng").trim(),
    body("description").isString().trim(),
    body("status").isString().default("pending").isIn(['pending', 'under-process', 'completed']).withMessage("Status Must be Either Pending,under-process Or completed"),
]
const registerValidations = [
    body('name').trim().not().isEmpty().withMessage("Name is required"),
    body('email').trim().not().isEmpty().withMessage("Email is required").bail().isEmail().withMessage("Enter a valid Email"),
    body('password').trim().not().isEmpty().withMessage("Enter a valid Password").bail().trim().isLength({ min: 6 }).withMessage("Password must be 6 character long")
]
const loginValiations = [
    body('email').trim().not().isEmpty().withMessage('Email is required'),
    body('password').trim().not().isEmpty().withMessage('Password is required'),
];
module.exports = { taskValidations, registerValidations, loginValiations };


