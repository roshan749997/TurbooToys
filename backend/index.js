import { configDotenv } from 'dotenv';
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import headerRoutes from './routes/header.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';

import connectDB from './config/DataBaseConnection.js';

configDotenv();

const server = express();

const allowedOrigins = [
  'https://sarees-frontend.onrender.com',
  'https://sarees-jwhn.onrender.com',
  'http://localhost:5173',
  'http://localhost:5174'
];

// CORS configuration
server.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
server.use(express.json());
server.use(cookieParser());

server.get('/api/health', (req, res) => res.json({ ok: true }));
server.use('/api/auth', authRoutes);
server.use('/api/header', headerRoutes);
server.use('/api/products', productRoutes);
server.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;

await connectDB(process.env.MONGODB_URI || '');

server.listen(PORT, () => {
  console.log('Server is running at', PORT);
});