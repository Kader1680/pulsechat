import { Router } from 'express';
import { pool } from '../db.js';
import { redis } from '../cache.js';
const router = Router();
router.get('/health', async (_req, res) => {
  const dbNow = await pool.query('SELECT NOW()').then(r => r.rows[0].now);
  const ping = await redis.ping();
  res.json({ db: dbNow, redis: ping, status: 'ok' });
});
export default router;