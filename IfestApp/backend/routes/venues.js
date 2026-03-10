import express from 'express';
import { pool } from '../db/index.js';

const router = express.Router();

// Get all venues
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Venues ORDER BY venue_id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a venue
router.post('/', async (req, res) => {
  const { venue_name, capacity, location } = req.body;
  try {
    await pool.query(
      'INSERT INTO Venues (venue_name, capacity, location) VALUES ($1, $2, $3)',
      [venue_name, capacity, location]
    );
    res.json({ message: '✅ Venue added successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
