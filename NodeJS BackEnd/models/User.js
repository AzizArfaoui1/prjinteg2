const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }, // Optional
});

module.exports = mongoose.model('User', userSchema);
