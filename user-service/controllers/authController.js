const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const exist = await User.findOne({ where: { username } });
    if (exist) return res.status(400).json({ message: 'Username already exists' });
    const user = await User.create({ username, password });
    res.status(201).json({ message: 'User registered', user: { id: user.id, username: user.username, points: user.points } });
  } catch (err) {
    res.status(500).json({ message: 'Register failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid password' });
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, points: user.points } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// 驗證 token（給其他服務用）
exports.verify = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'No token' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    res.json({ user });
  });
};

// 獲取當前用戶資訊
exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ 
      user: { 
        id: user.id, 
        username: user.username, 
        points: user.points 
      } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Get user info failed', error: err.message });
  }
};

// 查詢用戶點數
exports.getPoints = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ points: user.points });
  } catch (err) {
    res.status(500).json({ message: 'Get points failed', error: err.message });
  }
};

// 加點數
exports.addPoints = async (req, res) => {
  const { userId } = req.params;
  const { points } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.points += points;
    await user.save();
    res.json({ message: 'Points added', points: user.points });
  } catch (err) {
    res.status(500).json({ message: 'Add points failed', error: err.message });
  }
};

// 扣點數
exports.deductPoints = async (req, res) => {
  const { userId } = req.params;
  const { points } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.points < points) return res.status(400).json({ message: 'Insufficient points' });
    user.points -= points;
    await user.save();
    res.json({ message: 'Points deducted', points: user.points });
  } catch (err) {
    res.status(500).json({ message: 'Deduct points failed', error: err.message });
  }
}; 