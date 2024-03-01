const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/PortfolioItem');
const User = require('../models/User')
const isAuthenticated = require('../middleware/isAuthenticated');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');

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
  const size = 10;
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=Music&size=100`;

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

const GENIUS_ACCESS_TOKEN = 'Rtfy1qrpCEby02kkuAOgWnfJG8N6agylittRGCAcaC0tZkD-kzO_GfYFj0-II6P1';

router.get('/search-artist', isAuthenticated, async (req, res) => {
  const searchTerm = req.query.term; // Use 'term' query parameter for the search term

  if (!searchTerm) {
    return res.status(400).send('Search term is required');
  }

  const url = `https://api.genius.com/search?q=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${GENIUS_ACCESS_TOKEN}` }
    });
    const hits = response.data.response.hits;
    const songs = hits.map(hit => ({
        title: hit.result.title,
        artist: hit.result.primary_artist.name,
        url: hit.result.url, // URL to the Genius page of the song for lyrics
        albumCover: hit.result.song_art_image_thumbnail_url
    }));

    // Render the 'songs.ejs' template with the songs data
    res.render('songs', { songs });
} catch (error) {
    console.error('Error fetching song data:', error);
    res.status(500).send('Failed to fetch song data');
}
});

const LASTFM_API_KEY = '0f8aa42036b77ef70adbd403396eba5b';

router.get('/artist-info', async (req, res) => {
  const artist = req.query.artist;
  const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_API_KEY}&format=json`;

  try {
    const response = await axios.get(url);
    const artistInfo = response.data.artist;

    // Render an EJS template with the artist information
    res.render('artist-info', { artistInfo });
  } catch (error) {
    console.error('Error fetching artist info:', error);
    res.status(500).send('Failed to fetch artist info');
  }
});

module.exports = router;
