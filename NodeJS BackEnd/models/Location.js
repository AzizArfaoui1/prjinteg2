const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  address: { 
    type: String, 
    required: true 
  },
  ville: { 
    type: String, 
    required: true 
  },
  postal_code: { 
    type: String, 
    required: true 
  },
  country: { 
    type: String, 
    required: true 
  }
});

LocationSchema.methods.toString = function() {
  return `${this.address}, ${this.ville}, ${this.country}`;
};

module.exports = mongoose.model('Location', LocationSchema);
