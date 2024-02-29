const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/PortfolioItem');

// Display admin dashboard with existing items
router.get('/admin', async (req, res) => {
  const items = await PortfolioItem.find();
  res.render('admin', { items });
});

// Add new item
router.post('/admin/add-item', async (req, res) => {
  // Handle file upload and form data processing
  // Create a new PortfolioItem and save to database
  res.redirect('/admin');
});

// Edit item form (additional GET route to display form with existing item data might be needed)

// Update existing item
router.post('/admin/edit-item/:id', async (req, res) => {
  // Update the item in the database
  res.redirect('/admin');
});

// Delete existing item
router.post('/admin/delete-item/:id', async (req, res) => {
  await PortfolioItem.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

module.exports = router;
