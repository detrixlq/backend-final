const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('../models/User')

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/main', async (req, res) => {
  try {
    const items = await PortfolioItem.find({ deletedAt: null });
    res.render('main', { items });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const role = req.body.username === 'admin' ? 'admin' : 'regular';
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      country: req.body.country,
      gender: req.body.gender,
      role: role
    });

    const result = await user.save();
    res.redirect('/login'); // Redirect to login page after successful registration
  } catch (error) {
    if (error.code === 11000) { // MongoDB duplicate key error
      return res.status(400).send("Username already exists. Please choose another username.");
    }
    console.error(error);
    res.redirect('/register');
  }
});

  
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username: username });
      if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          return res.redirect('/main');
        } else {
          // Passwords do not match
          res.send('Invalid username or password');
        }
      } else {
        // User not found
        res.send('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      res.redirect('/login');
    }
  });
  

module.exports = router;