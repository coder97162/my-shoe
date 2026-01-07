const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = 5000;

// CORS middleware
app.use(cors());

// JSON body parser middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Product routes
app.use('/api/products', productsRouter);

// Auth routes
app.use('/api/auth', authRouter);

// Orders routes
app.use('/api/orders', ordersRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




