const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /api/admin/register (Dev/one-time use)
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const user = new User({ email, password, role: 'admin' });
    await user.save();

    res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error', error });
  }
};

// POST /api/admin/login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Create JWT
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, user: { email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error', error });
  }
};
