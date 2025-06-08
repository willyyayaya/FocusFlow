require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const linePayRoutes = require('./routes/linepay');
const productRoutes = require('./routes/products');
const questRoutes = require('./routes/quests');
const achievementRoutes = require('./routes/achievements');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/linepay', linePayRoutes);
app.use('/api/products', productRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/achievements', achievementRoutes);

app.get('/', (req, res) => {
  res.send('FocusFlow User Service is running!');
});

const PORT = process.env.PORT || 5001;
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
  });
});