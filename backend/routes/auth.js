const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// JWT Secret Key (in production, use environment variable)
const JWT_SECRET = 'your-secret-key-change-in-production';

// POST route for user registration
router.post('/register', async (req, res) => {
  const { Name, Email, Password } = req.body;

  // Validate required fields
  if (!Name || !Email || !Password) {
    return res.status(400).json({ 
      error: 'Name, Email, and Password are required fields' 
    });
  }

  try {
    // Check if user already exists
    const checkUserQuery = 'SELECT * FROM Users WHERE Email = ?';
    db.query(checkUserQuery, [Email], async (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(Password, saltRounds);

      // Insert user into database
      const insertQuery = 'INSERT INTO Users (Name, Email, Password) VALUES (?, ?, ?)';
      db.query(insertQuery, [Name, Email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).json({ error: 'Failed to register user' });
        }

        res.status(201).json({
          message: 'User registered successfully',
          userId: result.insertId
        });
      });
    });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST route for user login
router.post('/login', (req, res) => {
  const { Email, Password } = req.body;

  // Validate required fields
  if (!Email || !Password) {
    return res.status(400).json({ 
      error: 'Email and Password are required fields' 
    });
  }

  // Find user by email
  const query = 'SELECT * FROM Users WHERE Email = ?';
  db.query(query, [Email], async (err, results) => {
    if (err) {
      console.error('Error finding user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    try {
      // Compare password
      const isPasswordValid = await bcrypt.compare(Password, user.Password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.UserID, 
          email: user.Email 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token: token,
        user: {
          userId: user.UserID,
          name: user.Name,
          email: user.Email
        }
      });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

module.exports = router;



