const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Supabase Client
const supabase = require('./config/supabase');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');
const productRoutes = require('./routes/product.routes');

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/user', userRoutes);

const debugRoutes = require('./routes/debug.routes');
app.use('/api/debug', debugRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const checkJwt = require('./middleware/auth.middleware');

app.get('/api/verify-auth', checkJwt, (req, res) => {
  console.log('--- Auth Verification ---');
  console.log('Full User Object:', req.auth);

  const userId = req.auth.payload.sub;
  console.log('Extracted User ID:', userId);

  res.json({
    message: "Success",
    userId: userId,
    decodedToken: req.auth
  });
});

app.listen(PORT, () => {
  console.log('-------------------------------------------');
  console.log(`🚀 SERVER RESTARTED WITH FIXES on port ${PORT}`);
  console.log('-------------------------------------------');
  if (supabase) {
    console.log('Supabase client initialized successfully.');
  }
});
