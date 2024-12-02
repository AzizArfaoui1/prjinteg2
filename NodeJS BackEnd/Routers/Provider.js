const express = require('express');
const Provider = require('../models/Provider');
const router = express.Router();

// Existing GET route for fetching providers
router.get('/', async (req, res) => {
  const { location, job } = req.query;
  try {
    const filters = {};
    if (location) filters.location = location;
    if (job) filters.job = job;

    const providers = await Provider.find(filters);
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
});

// New POST route to create a provider
router.post('/', async (req, res) => {
  try {
    const { username, firstName, lastName, email, password, phone, location } = req.body;

    // Ensure all fields are provided
    if (!username || !firstName || !lastName || !email || !password || !phone || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if email already exists
    const existingProvider = await Provider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ error: 'Provider with this email already exists' });
    }

    // Create new provider (without specifying _id)
    const newProvider = new Provider({
      username,
      firstName,
      lastName,
      email,
      password,
      phone,
      location,
    });

    await newProvider.save();
    res.status(201).json(newProvider); // Return the created provider
  } catch (err) {
    console.error('Error creating provider:', err); // Log the full error
    res.status(500).json({ error: 'Failed to create provider', message: err.message });
  }
});





module.exports = router;
