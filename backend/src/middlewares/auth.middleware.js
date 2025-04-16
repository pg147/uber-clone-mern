import { ResponseError } from "../libs/utils.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function authUser(req, res, next) {
    // Finding token either through cookies or headers
    // In headers, authorization consists of 'bearer' followed by JWT String, hence splitting
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];

    if (!token) return ResponseError(res, 401, "Unauthorized access!");

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken._id);

        req.user = user;

        return next();
    } catch (error) {
        console.log(error.message);
        return ResponseError(res, 500, "Internal server error!");
    }
}