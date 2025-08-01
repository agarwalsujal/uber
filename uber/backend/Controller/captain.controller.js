import Captain from '../models/captain.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import BlackListToken from '../models/blackListToken.js';
import captainModel from '../models/captain.model.js';

const registerCaptain = async (req, res) => {
  try {
    const { fullname, email, password, vehicle } = req.body;
    // Check if input is valid
    if (!fullname || !email || !password || !vehicle) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Check if captain already exists
    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ message: 'Captain already exists' });
    }
    //   Create new captain
    const captain = new Captain({
      fullname,
      email,
      password,
      vehicle
    });
    // save the captain to the database
    const savedCaptain = await captain.save();
    // Generate token
    const token = captain.generateAuthToken();
    // Set token in cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict' // Adjust as necessary
    });
    res.status(201).json({ message: 'Captain registered successfully', captain: savedCaptain });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



const loginCaptain = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if input is valid
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    // Find captain by email
    const captain = await Captain.findOne({ email }).select('+password');
    if (!captain) {
      return res.status(404).json({ message: 'Captain not found' });
    }
    // Check password
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate token
    const token = captain.generateAuthToken();
    // Set token in cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict' // Adjust as necessary
    });
    res.status(200).json({ message: 'Login successful', captain: { id: captain._id, fullname: captain.fullname, email: captain.email, vehicle: captain.vehicle } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




const getCaptainDetails = async (req, res) => {
  try {
    const captain = req.captain; // Captured from the isCaptainAuthenticated middleware
    if (!captain) {
      return res.status(404).json({ message: 'Captain not found' });
    }
    res.status(200).json({ message: 'Captain details retrieved successfully', captain });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const logoutCaptain = async (req, res) => {
  try {
    const captain = req.captain;
    // Add token to blacklist
    const blacklistedToken = new BlackListToken({ token: req.token });
    await blacklistedToken.save();
    // Clear the cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:',);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export { registerCaptain, loginCaptain, logoutCaptain, getCaptainDetails };