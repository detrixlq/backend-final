function authorize(roles = []) {
    // roles param can be a single role string or an array of roles
    if (typeof roles === 'string') {
      roles = [roles];
    }
  
    return (req, res, next) => {
      if (!req.isAuthenticated() || roles.length && !roles.includes(req.user.role)) {
        // User is not authenticated or doesn't have the required role
        return res.status(403).send('Access denied');
      }
  
      // Authorization successful
      next();
    }
  }
  
  module.exports = authorize;
  