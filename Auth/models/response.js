const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  promptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isPublic: { type: Boolean, default: false },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
