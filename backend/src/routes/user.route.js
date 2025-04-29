import express from "express";
import { validateUserDetails } from "../middlewares/validations.middleware.js";
import { getUserProfile, login, logout, signup } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Signup User
router.post('/create', validateUserDetails, signup);

// Login User
router.post('/login', validateUserDetails, login);

// Logout User
router.get('/logout', authUser, logout);

// Fetch User profile
router.get('/profile', authUser, getUserProfile);

export default router;