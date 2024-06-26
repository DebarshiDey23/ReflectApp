const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const promptRoutes = require('./routes/promptRoutes');
const responseRoutes = require('./routes/responseRoutes');
const feedRoutes = require('./routes/feedRoutes');
const fetchPromptsCron = require('./fetchPromptsCron');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

app.use('/api/auth', authRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/feed', feedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  fetchPromptsCron(); // Correctly call fetchPromptsCron here
});
