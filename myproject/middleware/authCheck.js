function authCheck(req, res, next) {
    if (req.session && req.session._id) { // Assuming you store user's ID in session under `userId`
      return next();
    } else {
      res.redirect('/login'); // Redirect to login page if not logged in
    }
  }
  