import express from "express";
import { validateCaptainDetails } from "../middlewares/validations.middleware.js";
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Register Captain
router.post('/create', validateCaptainDetails, registerCaptain);

// Login Captain
router.post('/login', validateCaptainDetails, loginCaptain);

// Logout Captain
router.post('/logout', authCaptain, logoutCaptain);

// Fetch Captain Profile
router.get('/profile', authCaptain, getCaptainProfile);


export default router;