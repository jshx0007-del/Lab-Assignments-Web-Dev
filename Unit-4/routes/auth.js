const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const appEvents = require('../events/appEvents');
const { signToken } = require('../utils/token');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function adminEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

router.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body || {};

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email and password are required' });
    }
    if (!EMAIL_RE.test(email)) return res.status(400).json({ message: 'Invalid email format' });
    if (String(password).length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
    const hashed = await bcrypt.hash(String(password), rounds);

    const role = adminEmails().includes(normalizedEmail) ? 'admin' : 'user';
    const user = await User.create({ username, email: normalizedEmail, password: hashed, role });

    appEvents.emit('user:registered', user);
    res.status(201).json({
      message: 'User registered',
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    const valid = user && (await bcrypt.compare(String(password), user.password));
    if (!valid) return res.status(401).json({ message: 'Invalid email or password' });

    const token = signToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
    });

    appEvents.emit('user:loggedIn', user);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
