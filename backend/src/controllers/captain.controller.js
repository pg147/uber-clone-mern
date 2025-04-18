import { ResponseError, ResponseSuccess } from "../libs/utils.js";
import captainModel from "../models/captain.model.js";

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