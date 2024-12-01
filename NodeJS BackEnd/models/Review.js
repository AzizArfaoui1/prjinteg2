const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String, 
    required: false, 
    trim: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  providerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Provider', 
    required: true 
  }
});

reviewSchema.methods.toString = function() {
  return `Review by ${this.userId} for ${this.providerId} (${this.rating}/5)`;
};

module.exports = mongoose.model("Review", reviewSchema);
