const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API berjalan!' });
});

// Import routes
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const midtransRouter = require('./routes/midtrans');

// Use routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/midtrans', midtransRouter);

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
  console.log(`Supabase client siap terhubung`);
});