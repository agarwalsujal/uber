import app from './app.js';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
console.log('Loaded PORT:', process.env.PORT);
const port = process.env.PORT || 3000;

// Start the server
const server = http.createServer(app);  

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});