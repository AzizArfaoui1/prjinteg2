const express = require('express');
const Provider = require('../models/Provider');
const router = express.Router();

// Get all providers or filter by location/job
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

module.exports = router;
