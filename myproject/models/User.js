const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  firstName: String,
  lastName: String,
  age: Number,
  country: String,
  gender: String,
  creationDate: { type: Date, default: Date.now },
  role: {
    type: String,
    default: 'regular', // Default role
    enum: ['admin', 'regular'] // Allowed roles
  }
});

module.exports = mongoose.model('User', userSchema);
