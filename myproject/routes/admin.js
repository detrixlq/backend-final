const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/PortfolioItem');
const upload = require('../config/multerConfig');
const bodyParser = require('body-parser');
const isAdmin = require('../middleware/isAdmin');
const isAuthenticated = require('../middleware/isAuthenticated');
const User = require('../models/User')


// Display admin dashboard with existing items
router.get('/admin', isAuthenticated, async (req, res) => {
  const user = await User.findById(req.session.userId);
  if(user.role === "admin"){
    const items = await PortfolioItem.find();
    res.render('admin', { items });
  } else{
    return res.status(403).send('Access denied. Only admins allowed.');
  }
  
});

router.get('/admin/edit-item/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await PortfolioItem.findById(itemId);
    if (!item) {
      return res.status(404).send('Item not found');
    }

    res.render('edit-item', { item }); // Assuming you have an 'edit-item.ejs' view file
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


// Route to handle form submission
router.post('/admin/add-item', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      // Handle file upload error
      console.error(err);
      return res.status(500).send("An error occurred during file upload.");
    }

    if(req.files === undefined){
      return res.status(400).send("No files selected.");
    }

    // Create a new PortfolioItem with the form data
    const newPortfolioItem = new PortfolioItem({
      images: [].concat(req.body.images), 
      name: req.body.name,
      description: req.body.description
    });

    // Save the new item to the database
    newPortfolioItem.save()
      .then(() => res.redirect('/admin'))
      .catch(err => {
        console.error(err);
        res.status(500).send("Failed to save the item.");
      });
  });
});


// Edit item form (additional GET route to display form with existing item data might be needed)

// Update existing item
router.post('/admin/edit-item/:id', async (req, res) => {
  const itemId = req.params.id;
  const { name, description, images } = req.body;

  try {
    await PortfolioItem.findByIdAndUpdate(itemId, {
      name,
      description,
      images: [].concat(images) // Convert 'images' to an array if it's not already. This is a simplistic approach; adjust based on how you handle multiple image URLs.
    }, { new: true });

    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating the item');
  }
});


// Delete existing item
router.post('/admin/delete-item/:id', async (req, res) => {
  await PortfolioItem.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

module.exports = router;
