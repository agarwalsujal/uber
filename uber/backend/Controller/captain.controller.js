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
    if (!fullname || !email || !password || !vehicle ) {
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
export default registerCaptain;


