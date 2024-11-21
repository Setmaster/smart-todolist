// routes/user-api.js

const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

// Create a new user
router.post("/createUser", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  userQueries
    .addUser(user)
    .then((newUser) => {
      if (newUser) {
        req.session.userId = newUser.id;
        res.redirect('/todos'); // Redirect to /todos upon successful register
      } else {
        res.status(400).json({ error: "Failed to create user" });
      }
    })
    .catch((e) => res.status(500).json({ error: "Internal server error" }));
});

// Log a user in
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userQueries.getUserWithEmail(email)
    .then((user) => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send("Invalid email or password");
      }

      req.session.userId = user.id;
      res.redirect('/todos'); // Redirect to /todos upon successful login
    })
    .catch((e) => res.status(500).send("Internal server error"));
});

// Log a user out
router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.redirect('/'); // Redirect to landing page upon logout
});

// Return information about the current user (based on cookie value)
router.get("/me", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  userQueries
    .getUserWithId(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          id: userId,
        },
      });
    })
    .catch((e) => res.status(500).json({ error: "Internal server error" }));
});

// Update user information
router.put("/:id/update", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const { name, password } = req.body;
  let updatedUser;
  if (password === ""){
    updatedUser = { id: userId, name, password: null };
  }else{
    updatedUser = { id: userId, name, password: bcrypt.hashSync(password, 12) };
  }

  userQueries
    .updateUser(updatedUser)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          id: userId,
        },
      });
    })
    .catch((e) => res.status(500).json({ error: "Internal server error" }));
});

module.exports = router;
