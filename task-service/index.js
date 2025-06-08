require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const taskRoutes = require('./routes/tasks');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('FocusFlow Task Service is running!');
});

const PORT = process.env.PORT || 5002;
sequelize.sync({ alter: true }).then(() => {
app.listen(PORT, () => {
  console.log(`Task Service running on port ${PORT}`);
  });
});