module.exports = (req, res, next) => {
    // Simulated authentication: hardcoded user
    req.user = {
      id: 'admin123',
      role: 'school-coordinator',
      name: 'Coordinator John'
    };
    next();
  };
  