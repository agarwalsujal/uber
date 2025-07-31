import User  from '../models/user.model.js'

export const register = async (req, res) => {
  // Log the request to verify the endpoint is hit
  console.log(req.body);
  console.log('Register endpoint hit');
  try {
    const { fullname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    // Create new user
    const user = new User({
      fullname,
      email,
      password
    });
    let token = user.generateToken(); // Generate token if needed
    await user.save();
  res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict' // Adjust as necessary
    });
    res.status(201).json({ message: 'User registered successfully', user: { fullname, email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




export const login = async (req, res) => {
  // Log the request to verify the endpoint is hit
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email }).select('+password'); // Include password field for comparison
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = user.generateToken();
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict' // Adjust as necessary
    });

    res.status(200).json({ message: 'Login successful', user: { fullname: user.fullname, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
  res.status(200).json({ message: 'Logout successful' });
};

