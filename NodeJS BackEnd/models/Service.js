const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  date: { 
    type: Date, 
    required: true 
  },
  duree: { 
    type: String, 
    required: true 
  },
  providerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Provider', 
    required: true 
  }
}, {
  timestamps: true 
});

serviceSchema.methods.toString = function() {
  return `${this.serviceName} by ${this.providerId}`;
};

module.exports = mongoose.model('Service', serviceSchema);
