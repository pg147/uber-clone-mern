import express from "express";
import { validateUserDetails } from "../middlewares/validations.middleware.js";
import { getUserProfile, login, signup } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/create', validateUserDetails, signup);
router.post('/login', validateUserDetails, login);
router.get('/profile', authUser, getUserProfile);

export default router;