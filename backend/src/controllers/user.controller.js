import User from "../models/user.model.js";
import { ResponseError, ResponseSuccess } from "../libs/utils.js";
import bcrypt from "bcrypt";

export async function signup(req, res) {
    const { firstName, lastName, email, password } = req.body;  // extracting data

    if (!firstName || !lastName || !email || !password) return ResponseError(res, 400, 'All fields are required!');

    // Checking if the user already exists with the current email
    const userExists = await User.findOne({ email: email });

    // If exists, send error
    if (userExists) return ResponseError(res, 409, `User with ${email} already exists!`);

    // Hashing the original password
    const hashedPassword = await User.hashPassword(password);

    try {
        const user = await User.create({
            fullName: {
                firstName,
                lastName
            },
            email,
            password: hashedPassword
        });  // saving the user in the database

        // If user creation remains unsuccessful
        if (!user) return ResponseError(res, 400, 'User creation unsuccessful!');

        // Generating token
        const token = user.generateAuthToken();

        return ResponseSuccess(res, 201, { token, user });  // returning created user object
    } catch (error) {
        console.log(error.message);
        return ResponseError(res, 500, 'Internal server error');
    }
}

export async function login(req, res) {
    const { email, password } = req.body;  // extracting data

    // If any of the required fields is empty
    if (!email || !password) return ResponseError(res, 400, "All fields required!");

    // Fetching user with the email from the database
    const user = await User.findOne({ email: email }).select("+password");

    // If user not found
    if (!user) return ResponseError(res, 401, `User with ${email} not found!`);

    // Comparing the password with hashed password in the database
    const checkPassword = await user.comparePassword(password);

    // If password check fails
    if (!checkPassword) return ResponseError(res, 400, "Incorrect password!");

    const token = user.generateAuthToken();  // generating auth token

    res.cookie(`user_${user?._id}`, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: 360000
    }); // setting cookie

    // If every check remains successful then returning user along with auth token
    return ResponseSuccess(res, 200, { token, user });
}

export async function getUserProfile(req, res) {
    // Here only Success Response is required, since middleware checks for the possible failure
    return ResponseSuccess(res, 200, { user: req.user })
}

