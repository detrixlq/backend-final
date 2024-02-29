const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/PortfolioItem');
const User = require('../models/User')
const isAuthenticated = require('../middleware/isAuthenticated')

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const items = await PortfolioItem.find({ deletedAt: null });
    res.render('main', { items });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/my-profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    res.render('profile', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



module.exports = router;
