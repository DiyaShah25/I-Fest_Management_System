import express from "express";
import { pool } from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.event_id, e.name, e.date, v.venue_name, v.capacity
      FROM events e
      JOIN venues v ON e.venue_id = v.venue_id;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
