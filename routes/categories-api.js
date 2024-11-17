/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const categoriesQueries = require('../db/queries/categories');

router.get("/categories", (req, res) => {
  categoriesQueries
    .getAllCategories()
    .then((categories) => res.send({ categories }))
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

router.post("/addCategory", (req, res) => {
  const name = req.session.name;
  if (!name) {
    return res.send({ error: "error" });
  }

  categoriesQueries
    .addCategory(name)
    .then((category) => {
      res.send(category);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

module.exports = router;
