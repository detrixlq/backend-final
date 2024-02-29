const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/PortfolioItem');

router.get('/', async (req, res) => {
  try {
    const items = await PortfolioItem.find({ deletedAt: null });
    res.render('main', { items });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
