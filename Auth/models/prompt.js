const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;
