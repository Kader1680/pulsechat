import 'dotenv/config';
import express from 'express';
import { pool } from './db.js';
import { redis } from './cache.js';
import authRouter from './routes/auth.js';
import healthRouter from './routes/health.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api', healthRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Day1 server on ${port}`));