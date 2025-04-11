// routes/users.js
const express = require('express');
const db = require('../database');

const router = express.Router();

// Admin: View all users
router.get('/', (req, res) => {
const query = 'SELECT id, name, email, role FROM users';
db.query(query, (err, result) => {
if (err) return res.status(500).json({ message: 'Error fetching users', error: err });
res.json(result);
});
});

// Admin: View a specific user
router.get('/:id', (req, res) => {
const query = 'SELECT id, name, email, role FROM users WHERE id = ?';
db.query(query, [req.params.id], (err, result) => {
if (err) return res.status(500).json({ message: 'Error fetching user', error: err });
res.json(result[0]);
});
});

module.exports = router;