import express from 'express';
import { pool } from '../db/index.js';

const router = express.Router();

// Get all registrations
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.registration_id, p.name AS participant_name, e.name AS event_name, r.registered_at
      FROM Registrations r
      JOIN Participants p ON r.participant_id = p.participant_id
      JOIN Events e ON r.event_id = e.event_id
      ORDER BY r.registered_at DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register a participant for an event
router.post('/', async (req, res) => {
  const { participant_id, event_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO Registrations (participant_id, event_id) VALUES ($1, $2)',
      [participant_id, event_id]
    );
    res.json({ message: '✅ Participant registered for event!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
