import { ResponseError, ResponseSuccess } from "../libs/utils.js";
import captainModel from "../models/captain.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export async function registerCaptain(req, res) {
    const { firstName, lastName, email, password, color, numberPlate, vehicleType, capacity } = req.body;

    // If any of the fields are missing
    if (!firstName || !lastName || !email || !password || !color || !numberPlate || !vehicleType || !capacity) {
        return ResponseError(res, 400, 'All fields are required!');
    }

    // Checking if captain already exists
    const captainExists = await captainModel.findOne({ email: email });

    // If captain exists, send error
    if (captainExists) return ResponseError(res, 409, `Captain with ${email} already exists!`);

    // Hashing the password
    const hashedPassword = await captainModel.hashPassword(password);

    try {
        const captain = await captainModel.create({
            fullName: {
                firstName,
                lastName
            },
            email,
            password: hashedPassword,
            vehicle: {
                color,
                numberPlate,
                vehicleType,
                capacity
            }
        });

        // If captain creations remains unsuccessful
        if (!captain) return ResponseError(res, 400, 'Captain creation unsuccessful!');

        const token = captain.generateToken();  // generating token

        // If token creation remains unsuccessful
        if (!token) return ResponseError(res, 400, 'Error generating token!');

        // If creation successful -> returning captain along with token
        return ResponseSuccess(res, 201, { token, captain });
    } catch (error) {
        console.log(error.message);
        return ResponseError(res, 500, 'Internal server error!');
    }
}

export async function loginCaptain(req, res) {
    const { email, password } = req.body;  // extracting data

    // If any of the fields is missing
    if (!email || !password) return ResponseError(res, 400, 'All fields required!');

    // Fetching captain from the database using email
    const captain = await captainModel.findOne({ email: email }).select('+password');

    // If no captain was found using the email
    if (!captain) return ResponseError(res, 402, `Captain with ${email} not found!`);

    // Checking/comparing the hashed password with input password
    const checkPassword = await captain.comparePassword(password);

    // If password check fails
    if (!checkPassword) return ResponseError(res, 400, 'Incorrect password!');

    const token = captain.generateToken();  // generating token

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: 86400
    });  // setting cookie

    // Returning captain along with the token
    return ResponseSuccess(res, 200, { token, captain });
}

export async function logoutCaptain(req, res) {
    // Fetching token from cookies or headers
    const token = req.cookies?.token || req.headers?.authorization?.token;

    // Blacklisting the token in the database
    await blacklistTokenModel.create({ token });

    res.clearCookie('token');  // clearing the token from cookie

    return ResponseSuccess(res, 200, { message: "Logged out successfully!" });
}

export async function getCaptainProfile(req, res) {
    // Here only Success Response is required, since middleware checks for the possible failure
    return ResponseSuccess(res, 200, { captain: req.captain });
}
