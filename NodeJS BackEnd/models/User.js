const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  firstname:String,
  lastname:String,
  email: String,
  location:String,
  comments:Boolean,
  candidates: Boolean,
  offers: Boolean,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);
