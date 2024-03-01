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


async function fetchLiveMusicEvents() {
  const apiKey = 'xPxtD0Ardtysx4V1QvVRDshgZyEKbA7r';
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=Music&size=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();

      const seenArtists = {}; // Object to keep track of artists we've already added
      const uniqueEvents = data._embedded.events.filter(event => {
        // Assuming event.name uniquely identifies an artist or event
        if (seenArtists[event.name]) {
          return false; // Skip this event if we've seen this artist
        } else {
          seenArtists[event.name] = true; // Mark this artist as seen
          return true; // Include this event
        }});
    
    return uniqueEvents.map(event => ({
      name: event.name,
      url: event.url,
      images: event.images, // This includes all images related to the event
      city: event._embedded.venues[0].city.name, // Assuming the first venue's city; adjust if needed
      date: event.dates.start.localDate
    }));
  } catch (error) {
    console.error('Error fetching live music events:', error);
    return [];
  }
}

router.get('/live-music-events', isAuthenticated, async (req, res) => {
  const events = await fetchLiveMusicEvents();
  res.render('music', { events }); 
});


module.exports = router;
