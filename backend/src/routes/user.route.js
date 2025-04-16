import express from "express";
import { validateUserDetails } from "../middlewares/validations.middleware.js";
import {login, signup} from "../controllers/user.controller.js";

const router = express.Router();

router.post('/create', validateUserDetails, signup);
router.post('/login', validateUserDetails, login);

export default router;