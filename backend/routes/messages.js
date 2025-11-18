const express = require('express');
const router = express.Router();
const pool = require('../db');

// Lấy tất cả tin nhắn của học sinh
router.get('/:student_id', async (req, res) => {
  const { student_id } = req.params;
  try {
    const messages = await pool.query(
      'SELECT * FROM messages WHERE student_id=$1 ORDER BY created_at ASC',
      [student_id]
    );
    res.json(messages.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Thêm tin nhắn mới
router.post('/', async (req, res) => {
  const { student_id, sender, content, emotion, risk_level } = req.body;
  try {
    const newMessage = await pool.query(
      `INSERT INTO messages (student_id, sender, content, emotion, risk_level)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [student_id, sender, content, emotion, risk_level || 0]
    );
    res.json(newMessage.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
