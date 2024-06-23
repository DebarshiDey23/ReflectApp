const mongoose = require('mongoose');
const messageSchema = require('./messageModel');

const notificationSchema = new mongoose.Schema({
  prompt: {type: mongoose.Schema.Types.ObjectId, ref: 'Prompt'},
  responded: {type: Boolean, default: false},
  timestamp: {type: Date, default: Date.now},
})


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  firstName: {type: String},
  lastName: {type: String},
  lastUsernameChange: {type: Date, default: Date.now},
  messages: [messageSchema]
  // Other fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
