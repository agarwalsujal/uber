import registerCaptain from '../Controller/captain.controller.js';
import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/register', registerCaptain);



// Example usage in a test (pseudo-code):
// POST /register with body: testCaptainData[0]

export default router;