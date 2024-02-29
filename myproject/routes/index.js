const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/PortfolioItem');
const authCheck = require('../middleware/authCheck');

router.get('/', async (req, res) => {
  try {
    const items = await PortfolioItem.find({ deletedAt: null });
    res.render('main', { items });
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.get('/profile', authCheck, (req, res) => {
//   // Assuming `User` is your user model and you store the user's ID in `req.session.userId`
//   User.findById(req.session._id, (err, user) => {
//     if (err || !user) {
//       return res.redirect('/login');
//     }
//     res.render('profile', { user: user }); // Render the profile page with user data
//   });
// });

module.exports = router;
