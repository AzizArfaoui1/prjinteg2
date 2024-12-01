const express = require('express');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, firstname, lastname, email, password, location } = req.body;

    const user = new User({
      username,
      firstname,
      lastname,
      email,
      password,
      location, // Optional field
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user', message: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('location'); // Populate location if needed
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('location'); // Populate location if needed
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user', message: err.message });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const { username, firstname, lastname, email, password, location } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, firstname, lastname, email, password, location },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update user', message: err.message });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user', message: err.message });
  }
});

module.exports = router;