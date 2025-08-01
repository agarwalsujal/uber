import 'dotenv/config'; // Load environment variables from .env file
import cors from 'cors';


import express from 'express';
import { connect } from 'mongoose';
import connectDB from './db/db.js';
import userRoutes from './Routes/user.routes.js'; // Adjust the path as necessary
import captainRoutes from './Routes/captain.routes.js'; // Adjust the path as necessary
import cookieParser from 'cookie-parser';
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
connectDB(); // Connect to MongoDB
// Example route
app.get('/', (req, res) => {
  res.send('Uber backend API');
});

app.use('/api/users', userRoutes);
app.use('/api/captains', captainRoutes); // Assuming you have a captainRoutes file

export default app;
