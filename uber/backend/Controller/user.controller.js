import User from '../models/user.model.js'

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

// Get user profile
export const getProfile = async (req, res) => {
  try {
    // Get user ID from authenticated middleware
    const userId = req.user.id;

    // Find user by ID and exclude password
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile retrieved successfully',
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        socketId: user.socketId
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullname, email } = req.body;

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // Update user data
    const updateData = {};
    if (fullname) updateData.fullname = fullname;
    if (email) updateData.email = email;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        socketId: updatedUser.socketId
      }
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation error',
        errors: validationErrors
      });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Validate request body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Current password and new password are required'
      });
    }

    // Find user with password
    const user = await User.findById(userId).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete user account
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    // Validate password
    if (!password) {
      return res.status(400).json({ message: 'Password is required to delete account' });
    }

    // Find user with password
    const user = await User.findById(userId).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    // Clear cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

