// Dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routers
import userRouter from './routes/user.route.js';
import captainRouter from "./routes/captain.route.js";

dotenv.config(); // initialized dotenv for env variables

const app = express();  // initialized express app

app.use(express.json());  // middleware to parse data in json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // middleware to parse cookies
app.use(cors());  // middleware for cross-origin-resource-sharing

app.use('/api/v1'); // base route

// Routes
app.use('/users', userRouter);
app.use('/captains', captainRouter);

export { app };