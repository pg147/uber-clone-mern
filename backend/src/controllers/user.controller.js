import User from "../models/user.model.js";
import { ResponseError, ResponseSuccess } from "../libs/utils.js";

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