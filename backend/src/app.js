import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // initialized dotenv for env variables

const app = express();  // initialized express app

app.use(cors());  // middleware for cross-origin-resource-sharing

app.get('/', (req, res) => {
    res.send('Hello from app!');
});

export { app };