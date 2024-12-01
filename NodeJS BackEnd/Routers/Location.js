const express = require('express');
const Location = require('../models/Location'); // Adjust the path as needed
const router = express.Router();

// Create a new Location
router.post('/', async (req, res) => {
  try {
    const { address, ville, postal_code, country } = req.body;
    const newLocation = new Location({ address, ville, postal_code, country });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create location', message: err.message });
  }
});

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch locations', message: err.message });
  }
});

// Get a location by ID
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch location', message: err.message });
  }
});

// Update a location by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLocation) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(200).json(updatedLocation);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update location', message: err.message });
  }
});

// Delete a location by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);
    if (!deletedLocation) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete location', message: err.message });
  }
});

module.exports = router;