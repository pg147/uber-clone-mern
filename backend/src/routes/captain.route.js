import express from "express";
import { validateCaptainDetails } from "../middlewares/validations.middleware.js";
import { registerCaptain } from "../controllers/captain.controller.js";

const router = express.Router();

router.post('/create', validateCaptainDetails, registerCaptain);

export default router;