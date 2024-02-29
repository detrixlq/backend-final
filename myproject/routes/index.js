const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/PortfolioItem');
const authCheck = require('../middleware/authCheck');
const User = require('../models/User')

router.get('/', async (req, res) => {
  try {
    const items = await PortfolioItem.find({ deletedAt: null });
    res.render('main', { items });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/my-profile', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login'); // Redirect to login if not authenticated
  }

  try {
    const user = await User.findById(req.session.userId);
    res.render('profile', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



module.exports = router;
