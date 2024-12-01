const express = require('express');
const ServiceRequest = require('../models/ServiceRequest');
const router = express.Router();

// Create a new service request
router.post('/', async (req, res) => {
  const { userId, providerId, serviceDetails, address } = req.body;

  try {
    const serviceRequest = new ServiceRequest({
      user: userId,
      provider: providerId,
      serviceDetails,
      address,
    });

    await serviceRequest.save();
    res.status(201).json(serviceRequest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create service request' });
  }
});

// Get service requests for a specific provider
router.get('/provider/:providerId', async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({ provider: req.params.providerId })
      .populate('user', 'username email location')
      .exec();

    res.json(serviceRequests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service requests' });
  }
});

// Update the status of a service request
router.patch('/:id', async (req, res) => {
  const { status } = req.body;

  try {
    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedRequest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update service request' });
  }
});
// Endpoint : Rechercher tous les services
router.get('/search', async (req, res) => {
  try {
    const services = await Service.find()
      .populate('provider', 'firstname lastname location')
      .exec();

    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});


module.exports = router;