import { Router } from 'express';
import { pool } from '../db.js';
const router = Router();

router.get('/rooms', async (_req, res) => {

    try {
        const { rows } = await pool.query('SELECT id, name FROM rooms ORDER BY name ASC');
        res.json({ rooms: rows });
        console.log(rows);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: 'Server error fetching rooms' });
    }

});

export default router;