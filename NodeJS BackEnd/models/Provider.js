const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
    username: String,
    image: String,
    job: String,
    firstname: String,
    lastname: String,
    email: String,
    location: String,
    comments: Boolean
});

module.exports = mongoose.model('Provider', ProviderSchema);