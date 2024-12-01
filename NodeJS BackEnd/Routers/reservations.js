const express = require('express');
const Reservation = require('../models/Reservation');
// const Service = require('../models/ServiceRequest');
const router = express.Router();

// Endpoint : Créer une réservation
router.post('/', async (req, res) => {
  const { serviceId, userId } = req.body;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const reservation = new Reservation({
      service: serviceId,
      user: userId,
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

// Endpoint : Liste des réservations pour un Provider
router.get('/provider/:providerId', async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate({
        path: 'service',
        match: { provider: req.params.providerId },
        populate: { path: 'provider', select: 'firstname lastname location' },
      })
      .populate('user', 'firstname lastname location')
      .exec();

    const providerReservations = reservations.filter((res) => res.service !== null);
    res.json(providerReservations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

// Endpoint : Modifier le status d'une réservation (par le Provider)
router.patch('/:id', async (req, res) => {
  const { status } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedReservation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update reservation' });
  }
});

module.exports = router;
