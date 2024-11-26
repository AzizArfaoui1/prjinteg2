const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
  service_id : {type: Number},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true }, // Reference to Provider
  serviceDetails: { type: String, required: true }, // Description of the requested service
  address: { type: String, required: true }, // User's address
  status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' }, // Status of the request
  createdAt: { type: Date, default: Date.now }, // Request creation date
});

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);
