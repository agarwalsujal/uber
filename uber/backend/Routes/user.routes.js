import express from 'express';
import { register, login, logout, getProfile, updateProfile, changePassword, deleteAccount } from '../Controller/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// User logout route (requires authentication)
router.post('/logout', isAuthenticated, logout);

// Profile routes (all require authentication)
router.get('/profile', isAuthenticated, getProfile);
router.put('/profile', isAuthenticated, updateProfile);
router.put('/profile/change-password', isAuthenticated, changePassword);
router.delete('/profile', isAuthenticated, deleteAccount);

export default router;
