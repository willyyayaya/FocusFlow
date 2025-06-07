const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// 註冊
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const exist = await User.findOne({ where: { username } });
    if (exist) return res.status(400).json({ message: 'Username already exists' });
    const user = await User.create({ username, password });
    res.status(201).json({ message: 'User registered', user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Register failed', error: err.message });
  }
});

// 登入
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid password' });
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

module.exports = router; 