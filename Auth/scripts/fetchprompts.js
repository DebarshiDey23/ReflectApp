const axios = require('axios');
const mongoose = require('mongoose');
const Prompt = require('../models/Prompt'); // Adjust the path as needed
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

const fetchPrompts = async () => {
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003', // or the model you prefer
      prompt: 'Generate a random thought-provoking question.',
      max_tokens: 50,
      n: 10 // Number of prompts to generate
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const prompts = response.data.choices.map(choice => ({ content: choice.text.trim() }));

    await Prompt.insertMany(prompts);
    console.log('Prompts inserted successfully');
  } catch (error) {
    console.error('Error fetching or inserting prompts:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

fetchPrompts();
