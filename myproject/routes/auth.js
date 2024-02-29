const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('../models/User')

router.get('/register', (req, res) => {
  res.render('register');
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
          req.session.userId = user._id; // Assuming 'user' is the authenticated user object
          res.redirect('/my-profile');
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

  router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Could not log out. Please try again.');
      }
  
      res.redirect('/login'); // Redirect to the login page or home page after logging out
    });
  });
  
  

module.exports = router;