const express = require('express');
const router = express.Router();

// Middleware to check if user is logged in
function checkLoggedIn(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/'); // Redirect to landing page if not logged in
}

// Landing page route
router.get('/', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/todos'); // Redirect to todos if already logged in
  }
  res.render('landing'); // Render landing page if not logged in
});

// Todos page route
router.get('/todos', checkLoggedIn, (req, res) => {
  res.render('todos'); // Render todos page if logged in
});

module.exports = router;
