import express from "express";
import { validateCaptainDetails } from "../middlewares/validations.middleware.js";
import { loginCaptain, registerCaptain } from "../controllers/captain.controller.js";

const router = express.Router();

router.post('/create', validateCaptainDetails, registerCaptain);
router.post('/login', validateCaptainDetails, loginCaptain);

export default router;