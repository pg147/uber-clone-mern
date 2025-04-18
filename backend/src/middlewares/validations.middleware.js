import { body, validationResult } from "express-validator";
import User from "../models/user.model.js";
import { ResponseError } from "../libs/utils.js";

export function validateUserDetails(req, res, next) {
    const { firstName, email, password } = req.body;

    body('email').isEmail().withMessage('Invalid email');
    body('firstName').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long!');
    body('password').isLength({ min: 6 }).withMessage('Password should be minimum 6 characters long!');

    const errors = validationResult(req);

    if (!errors.isEmpty()) return ResponseError(res, 400, errors.array());

    next();
};

export function validateCaptainDetails(req, res, next) {
    const { firstName, email, password, color, numberPlate, vehicleType, capacity } = req.body;

    body('email').isEmail().withMessage('Invalid email');
    body('firstName').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long!');
    body('password').isLength({ min: 6 }).withMessage('Password should be minimum 6 characters long!');
    body('color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long!');
    body('numberPlate').isLength({ min: 9 }).withMessage('Number plate characters must be 9 characters!');
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1!');
    body('vehicleType').isIn(['car', 'auto', 'motorcycle']).withMessage('Invalid vehicle type!');

    const errors = validationResult(req);

    if (!errors.isEmpty()) return ResponseError(res, 400, errors.array());

    next();
}