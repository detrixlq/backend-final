const User = require('../models/User');

function isAdmin(req, res, next) {
    const user = User.findById(req.session.userId);
    if (user.role === "admin") {
      return next();
    } else {
      return res.status(403).send('Access denied. Only admins allowed.');
    }
  }
  
  module.exports = isAdmin;
  