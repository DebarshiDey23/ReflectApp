const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Correctly call dotenv.config() as a function
const authRoutes = require('./routes/authRoutes');
const promptRoutes = require('./routes/promptRoutes');
const responseRoutes = require('./routes/responseRoutes');
const authController = require('./controllers/authController');
const fetchPromptsCron = require('./fetchPromptsCron'); // Add this line


const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { // Use process.env.MONGODB_URI here
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  fetchPromptsCron(); // Start the cron job
});
