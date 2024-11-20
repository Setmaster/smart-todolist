const express = require('express');
const router = express.Router();
const {categories} = require('../lib/ai-utils');
const {getUserWithId} = require("../db/queries/users");

// Middleware to check if user is logged in
function checkLoggedIn(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/'); // Redirect to landing page if not logged in
}

//Middleware to attach login status to router
function attachLoginStatus(req, res, next){
  res.locals.isLoggedIn = req.session && req.session.userId ? true : false;
  next();
}

router.use(attachLoginStatus);

// Landing page route
router.get('/', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/todos'); // Redirect to todos if already logged in
  }
  res.render('landing'); // Render landing page if not logged in
});

// Todos page route
router.get('/todos', checkLoggedIn, async (req, res) => {
  try {
    const user = await getUserWithId(req.session.userId);
    const templateVars = {
      categories,
      userEmail: user.email
    };
    res.render('todos', templateVars); // Render todos page if logged in
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
