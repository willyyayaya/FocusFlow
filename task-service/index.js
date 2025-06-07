require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('FocusFlow backend is running!');
});

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  });
});