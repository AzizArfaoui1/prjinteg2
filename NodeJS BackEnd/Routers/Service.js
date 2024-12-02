const express = require('express');
const Service = require('../models/Service'); // Importer le modèle Service
const router = express.Router();

// Créer un nouveau service
router.post('/', async (req, res) => {
  try {
    const { name, description, price, providerId } = req.body;

    // Créer une nouvelle instance de Service
    const service = new Service({
      name,
      description,
      price,
      providerId
    });

    // Sauvegarder le service dans la base de données
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création du service', message: err.message });
  }
});

// Récupérer tous les services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().populate('providerId'); // Populer providerId si nécessaire
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des services' });
  }
});

// Récupérer un service par ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('providerId');
    if (!service) {
      return res.status(404).json({ error: 'Service non trouvé' });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération du service', message: err.message });
  }
});

// Mettre à jour un service par ID
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, providerId } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, price, providerId },
      { new: true } // Retourner le service mis à jour
    );

    if (!updatedService) {
      return res.status(404).json({ error: 'Service non trouvé' });
    }

    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour du service', message: err.message });
  }
});

// Supprimer un service par ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ error: 'Service non trouvé' });
    }
    res.json({ message: 'Service supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression du service', message: err.message });
  }
});

module.exports = router;
