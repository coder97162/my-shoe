const express = require('express');
const router = express.Router();
const db = require('../db');

// GET route to fetch all products
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Products';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }

    res.status(200).json(results);
  });
});

// POST route to add a new product
router.post('/admin/add', (req, res) => {
  const { Name, Category, Price, ImageURL } = req.body;

  // Validate required fields
  if (!Name || !Category || !Price) {
    return res.status(400).json({ 
      error: 'Name, Category, and Price are required fields' 
    });
  }

  // SQL query to insert product
  const query = 'INSERT INTO Products (Name, Category, Price, ImageURL) VALUES (?, ?, ?, ?)';
  
  db.query(query, [Name, Category, Price, ImageURL || null], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ error: 'Failed to add product' });
    }

    res.status(201).json({
      message: 'Product added successfully',
      productId: result.insertId
    });
  });
});

module.exports = router;

