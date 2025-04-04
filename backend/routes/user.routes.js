const express = require('express');
const UserRouter = express.Router();
const { body } = require('express-validator');
const UserController = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/auth.middleware');



UserRouter.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 
UserController.registerUser
);

UserRouter.post("/login", [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
UserController.loginUser
);


UserRouter.get('/profile', authMiddleware.authUser, UserController.getUserProfile)
UserRouter.get('/logout', authMiddleware.authUser, UserController.logoutUser)




module.exports = UserRouter; // Exporting the router object so that it can be used in the app.js file