const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assurez-vous du chemin correct
const Provider = require('../models/Provider'); // Assurez-vous du chemin correct

const router = express.Router();

// Clé secrète pour JWT (ne la partagez jamais publiquement)
const JWT_SECRET = 'totally_secret_key';

// Endpoint Login
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cherche dans la collection des utilisateurs
    let user = await User.findOne({ email, password }); // Vérification directe
    if (user) {
      // Crée un JWT pour l'utilisateur
      const token = jwt.sign({ id: user._id, role: 'User' }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({
        id: user._id,
        username: user.username,
        role: 'User',
        data: user,
        token,
      });
    }

    // Cherche dans la collection des prestataires
    let provider = await Provider.findOne({ email, password }); // Vérification directe
    if (provider) {
      // Crée un JWT pour le prestataire
      const token = jwt.sign({ id: provider._id, role: 'Provider' }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({
        id: provider._id,
        username: provider.username,
        role: 'Provider',
        data: provider,
        token,
      });
    }

    // Si aucun utilisateur ou prestataire n'est trouvé
    return res.status(404).json({ message: "Aucun utilisateur ou prestataire trouvé avec cet email et mot de passe." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
