import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { pool } from './db.js';
import { redis } from './cache.js';
import { initWS } from './ws/index.js';

import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';

console.log('POSTGRES_URL:', process.env.POSTGRES_URL);
console.log('REDIS_URL:', process.env.REDIS_URL);

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', healthRoutes);

const httpServer = initWS(app);

const port = process.env.PORT || 4000;
httpServer.listen(port, () => console.log(`Server running on port ${port}`));
