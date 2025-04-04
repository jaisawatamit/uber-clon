const express = require('express');
const CaptainRouter = express.Router();
const { body } = require('express-validator');
const CaptainController = require('../controllers/Captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');


CaptainRouter.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isLength({ min: 3 }).withMessage('Vehicle type must be at least 3 characters long'),

], CaptainController.registerCaptain);


CaptainRouter.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], CaptainController.loginCaptain);


CaptainRouter.get('/logout',authMiddleware.authCaptain, CaptainController.logoutCaptain);

CaptainRouter.get('/profile',authMiddleware.authCaptain ,CaptainController.getCaptainProfile);




module.exports = CaptainRouter; // Exporting the router object so that it can be used in the app.js file