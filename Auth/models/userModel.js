const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  firstName: {type: String},
  lastName: {type: String},
  lastUsernameChange: {type: Date, default: Date.now},
  // Other fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
