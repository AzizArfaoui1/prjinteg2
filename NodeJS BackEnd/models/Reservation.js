const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  providerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Provider', 
    required: true 
  },
  serviceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED'], 
    default: 'PENDING' 
  }
}, {
  timestamps: true 
});

reservationSchema.methods.toString = function() {
  return `${this.userId} booked ${this.serviceId} with ${this.providerId}`;
};

module.exports = mongoose.model('Reservation', reservationSchema);
