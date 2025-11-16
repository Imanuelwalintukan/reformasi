const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
const isProduction = process.env.NODE_ENV === 'production';
const corsOrigin = isProduction
  ? ['https://reformasi.my.id']
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: corsOrigin,
  credentials: true
}));
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
const dummyAuthRouter = require('./routes/dummyAuth');

// Use routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/midtrans', midtransRouter);

// Conditional dummy auth routes based on environment variable
const enableDummyAuth = process.env.ENABLE_DUMMY_AUTH === 'true';
if (enableDummyAuth) {
  app.use('/api/dummy', dummyAuthRouter);
  console.log('Dummy authentication routes enabled');
} else {
  console.log('Dummy authentication routes disabled (set ENABLE_DUMMY_AUTH=true to enable)');
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
  console.log(`Supabase client siap terhubung`);
});