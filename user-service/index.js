require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('FocusFlow User Service is running!');
});

const PORT = process.env.PORT || 5001;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
  });
});