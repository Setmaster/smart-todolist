const express = require('express');
const router  = express.Router();
const todosQueries = require('../db/queries/todos');

// Create a new todo
router.post("/addToDo", (req, res) => {
  const user_id = req.body.user_id;
  const enquire = req.body.enquire;
  todosQueries
    .addToDo(user_id,enquire)
    .then((list) => {
      if (!list) {
        return res.send({ error: "error" });
      }
    })
    .catch((e) => res.send(e));
});

// Update todo
router.post("/updateToDo", (req, res) => {
  let list = { 'id' : req.body.id, 'title' : req.body.title, "details": req.body.details, "category": req.body.category};
  todosQueries
    .updateToDo(list)
    .then((list) => {
      if (!list) {
        return res.send({ error: "error" });
      }
    })
    .catch((e) => res.send(e));
});

// set Complete todo
router.post("/completeToDo", (req, res) => {
  let id = req.body.id;
  todosQueries
    .completeToDo(id)
    .then((list) => {
      if (!list) {
        return res.send({ error: "error" });
      }
    })
    .catch((e) => res.send(e));
});

// set not Complete todo
router.post("/resetToDo", (req, res) => {
  let id = req.body.id;
  todosQueries
    .resetToDo(id)
    .then((list) => {
      if (!list) {
        return res.send({ error: "error" });
      }
    })
    .catch((e) => res.send(e));
});

// delete todo
router.post("/deleteToDo", (req, res) => {
  let id = req.body.id;
  todosQueries
    .deleteToDo(id)
    .then((list) => {
      if (!list) {
        return res.send({ error: "error" });
      }
    })
    .catch((e) => res.send(e));
});

