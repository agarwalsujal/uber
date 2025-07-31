import 'dotenv/config'; // Load environment variables from .env file
import cors from 'cors';


import express from 'express';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Example route
app.get('/', (req, res) => {
  res.send('Uber backend API');
});

export default app;
