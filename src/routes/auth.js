  import { Router } from 'express';
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  import { pool } from '../db.js';
  const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, msg: "Username and password required" });
    }

     
    const hashed = await bcrypt.hash(password, 10);

   
    const { rows } = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashed]
    );

 
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: rows[0],
    });

  } catch (error) {
    console.error(error);

 
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: "Username already taken"
      });
    }

    // General error
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later"
    });
  }
});

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const { rows } = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if (rows.length === 0) return res.status(401).json({ msg: 'Invalid' });
    const ok = await bcrypt.compare(password, rows[0].password);
    if (!ok) return res.status(401).json({ msg: 'Invalid' });

const token = jwt.sign(
  { uid: rows[0].id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
    res.json({ token });
  });
  export default router;