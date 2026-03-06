import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './src/config/db.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productRoutes from './src/routes/productRoutes.js';

// Load environment variables from .env file if present

const app = express();

// middleware
app.use(express.json());

// mount routers
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// basic health check
app.get('/', (req, res) => {
  res.send('E-commerce catalog API is running');
});

const PORT = process.env.PORT || 3001;

// Host binding: default to localhost for local development, but allow
// overriding with the HOST env var (set HOST=0.0.0.0 on Render).
const HOST = process.env.HOST || '127.0.0.1';

// Start the HTTP server immediately so hosting platforms (Render)
// can detect the open port. Attempt to connect to MongoDB in the
// background and log connection status. A missing/invalid
// `MONGODB_URI` should not prevent the service from binding.
app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });
