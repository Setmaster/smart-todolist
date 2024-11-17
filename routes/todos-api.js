const express = require('express');
const router  = express.Router();
const todosQueries = require('../db/queries/todos');

// Create a new todo
router.post("/", (req, res) => {
  const list = req.body;
  todosQueries
    .addToDo(list)
    .then((list) => {
      if (!list) {
        return res.send({ error: "error" });
      }
    })
    .catch((e) => res.send(e));
});

