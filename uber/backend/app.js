import 'dotenv/config'; // Load environment variables from .env file
import cors from 'cors';


import express from 'express';
import { connect } from 'mongoose';
import connectDB from './db/db.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
connectDB(); // Connect to MongoDB
// Example route
app.get('/', (req, res) => {
  res.send('Uber backend API');
});

export default app;
