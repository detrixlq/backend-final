const mongoose = require('mongoose');

const PortfolioItemSchema = new mongoose.Schema({
  images: [{ type: String }], // URLs to images
  name: {
    en: String,
    anotherLanguage: String
  },
  description: {
    en: String,
    anotherLanguage: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null }
});   

module.exports = mongoose.model('PortfolioItem', PortfolioItemSchema);
