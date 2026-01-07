const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

// POST route to place an order
router.post('/place-order', authenticateToken, (req, res) => {
  const { ProductID } = req.body;
  const UserID = req.user.userId; // Get UserID from authenticated token

  // Validate required fields
  if (!ProductID) {
    return res.status(400).json({ 
      error: 'ProductID is required' 
    });
  }

  // SQL query to insert order
  const query = 'INSERT INTO Orders (UserID, ProductID, Status) VALUES (?, ?, ?)';
  
  db.query(query, [UserID, ProductID, 'Pending'], (err, result) => {
    if (err) {
      console.error('Error placing order:', err);
      return res.status(500).json({ error: 'Failed to place order' });
    }

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: result.insertId,
      userId: UserID,
      productId: ProductID,
      status: 'Pending'
    });
  });
});

module.exports = router;



