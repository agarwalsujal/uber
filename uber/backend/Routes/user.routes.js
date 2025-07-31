import express from 'express';
import {register,login} from '../Controller/user.controller.js'; // Adjust the path as necessary
import { logout } from '../Controller/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
const router = express.Router();

// Example controller functions (replace with actual implementations)


// User registration route
router.post('/register', register);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);

// User login route

export default router;
