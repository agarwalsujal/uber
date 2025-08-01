import {registerCaptain, loginCaptain,logoutCaptain } from '../Controller/captain.controller.js';
import express from 'express';
import {isCaptainAuthenticated} from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/register', registerCaptain);
router.post('/login', loginCaptain);
router.post('/logout', isCaptainAuthenticated, logoutCaptain);



// Example usage in a test (pseudo-code):
// POST /register with body: testCaptainData[0]

export default router;