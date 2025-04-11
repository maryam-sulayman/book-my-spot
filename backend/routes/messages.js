// routes/messages.js
const express = require('express');
const db = require('../database');

const router = express.Router();

// Send a message
router.post('/', (req, res) => {
const { receiverId, content } = req.body;

const query = 'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)';
const values = [req.user.id, receiverId, content];

db.query(query, values, (err, result) => {
if (err) return res.status(500).json({ message: 'Error sending message', error: err });
res.json({ messageId: result.insertId, content });
});
});

// Get all messages for the logged-in user (both sent and received)
router.get('/', (req, res) => {
const query = 'SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ?';
db.query(query, [req.user.id, req.user.id], (err, result) => {
if (err) return res.status(500).json({ message: 'Error fetching messages', error: err });
res.json(result);
});
});

module.exports = router;