const express = require('express');
const Review = require('../models/Review'); // Make sure the path is correct
const router = express.Router();

// Create a new review
router.post('/', async (req, res) => {
    const { rating, comment, userId, providerId } = req.body;
  
    if (!rating || !userId || !providerId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {
      const review = new Review({
        rating,
        comment,
        userId,
        providerId,
      });
      await review.save();
      res.status(201).json(review);
    } catch (err) {
      console.error('Error creating review:', err);
      res.status(500).json({ error: 'Failed to create review', message: err.message });
    }
  });

// Get all reviews for a provider
router.get('/provider/:providerId', async (req, res) => {
  const { providerId } = req.params;
  
  try {
    const reviews = await Review.find({ providerId }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get a specific review by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const review = await Review.findById(id).populate('userId', 'username');
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    console.error('Error fetching review:', err);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
});

// Update a review
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true } // Return the updated review
    );
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete a review
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router;
