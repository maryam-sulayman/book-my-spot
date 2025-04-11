const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const { jwtSecret } = require('../config');

const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
      console.log('Token missing');
      return res.status(403).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        console.log('Invalid token:', err.message);
        return res.status(403).json({ message: 'Unauthorized' });
      }
      console.log('Decoded user:', decoded); 
      req.user = decoded;
      next();
    });
  };

  const requireRole = (role) => (req, res, next) => {
    console.log('Decoded user in middleware:', req.user);
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
  
  

// Sign-up route
router.post('/sign-up', (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  const values = [name, email, hashedPassword, role];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error registering user', error: err });
    res.status(201).json({ id: result.insertId, name, email, role });
  });
});

// Sign-in route
router.post('/sign-in', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Check user in database
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, jwtSecret, { expiresIn: '12h' });
    res.cookie('token', token).json({ message: 'Logged in successfully', token });
    console.log('Generated JWT payload:', { id: user.id, name: user.name, role: user.role });

  });
});


// Profile route
router.get('/profile', requireAuth, (req, res) => {
  const query = 'SELECT id, name, email, role FROM users WHERE id = ?';
  db.query(query, [req.user.id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(500).json({ message: 'Error fetching user details' });
    }

    const user = result[0];
    res.json(user);
  });
});
router.post('/sign-out', (req, res) => {
    res.clearCookie('token', { path: '/' }); // Clear the token cookie
    res.status(200).json({ message: 'Signed out successfully' });
  });
  

module.exports = {
  requireAuth,
  requireRole,
  router,
};
