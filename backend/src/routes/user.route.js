import express from "express";
import { validateUserDetails } from "../middlewares/validations.middleware.js";
import { signup } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/create', validateUserDetails, signup);

export default router;