import { body, validationResult } from "express-validator";
import User from "../models/user.model.js";
import { ResponseError } from "../libs/utils.js";

export function validateUserDetails(req, res, next) {
    const { firstName, email, password } = req.body;

    body('email').isEmail().withMessage('Invalid email');
    body('firstName').isLength(3).withMessage('First Name must be at least 3 characters long!');
    body('password').isLength(6).withMessage('Password should be minimum 6 characters long!');

    const errors = validationResult(req);

    if (!errors.isEmpty()) return ResponseError(res, 400, errors.array());

    next();
}