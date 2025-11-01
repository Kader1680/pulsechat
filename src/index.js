import 'dotenv/config';
import express from 'express';
import { pool } from './db.js';
import { redis } from './cache.js';
import { initWS } from './ws/index.js';

import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));


app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', healthRoutes);

// WebSocket
const httpServer = initWS(app);

const port = process.env.PORT || 4000;
httpServer.listen(port, () => console.log(`Day2 WS ready on ${port}`));
