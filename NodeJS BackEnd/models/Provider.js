const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: false }, // Ensure location is provided
  });
  
  // Don't manually set '_id' to null or any other value
  module.exports = mongoose.model('Provider', providerSchema);
  