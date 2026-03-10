import express from "express";
import { pool } from "../db/index.js";

const router = express.Router();

// Get all participants
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM participants");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a participant
router.post("/", async (req, res) => {
  try {
    const { name, email, event_id } = req.body;
    const result = await pool.query(
      "INSERT INTO participants (name, email, event_id) VALUES ($1, $2, $3) RETURNING *",
      [name, email, event_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
