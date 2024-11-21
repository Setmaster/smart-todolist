// routes/todo-api.js

const express = require('express');
const router = express.Router();
const todosQueries = require('../db/queries/todos');

// Create a new todo
router.post("/addToDo", (req, res) => {
  const user_id = req.session.userId;
  const enquire = req.body.enquire;
  console.log('req body enquire and id:', enquire, user_id)
  todosQueries
    .addToDo(user_id, enquire)
    .then((newTodo) => {
      if (newTodo) {
        return res.status(201).json(newTodo);
      } else {
        return res.status(400).json({ error: "Failed to create todo" });
      }
    })
    .catch((e) => res.status(500).json({ error: "Internal server error" }));
});

// Update todo
//NOTE: should be changed to put later after the form is fixed
router.put("/updateToDo", (req, res) => {
  const list = { id: req.body.id, title: req.body.title, details: req.body.details, category: req.body.category };
  todosQueries
    .updateToDo(list)
    .then((updatedTodo) => {
      if (updatedTodo) {
        return res.status(200).json(updatedTodo);
      } else {
        return res.status(404).json({ error: "Todo not found" });
      }
    })
    .catch((e) => res.status(500).json({ error: "Internal server error" }));
});

// Set Complete todo
router.put("/completeToDo", (req, res) => {
  const id = req.body.id;
  todosQueries
    .completeToDo(id)
    .then((completedList) => {
      if (completedList) {
        return res.status(200).json(completedList);
      } else {
        return res.status(404).json({ error: "Todo not found" });
      }
    })
    .catch((e) => res.status(500).json({ error: "Internal server error" }));
});

// Set not Complete todo
router.put("/uncompleteTodo", (req, res) => {
  const id = req.body.id;
  todosQueries
    .uncompleteTodo(id)
    .then((uncompletedTodo) => {
      if (uncompletedTodo) {
        return res.status(200).json(uncompletedTodo);
      } else {
        return res.status(404).json({ error: "Todo not found" });
      }
    })
    .catch((e) => res.status(500).json({ error: "Internal server error" }));
});

// Delete todo
router.delete("/deleteToDo", (req, res) => {
  const id = req.body.id;
  todosQueries
    .deleteToDo(id)
    .then((deletedTodo) => {
      if (deletedTodo) {
        return res.status(200).json({ message: "Todo deleted successfully" });
      } else {
        return res.status(404).json({ error: "Todo not found" });
      }
    })
    .catch((e) => res.status(500).json({ error: "Internal server error" }));
});

// All todos for a given user/category
router.post("/toDosByCategory", (req, res) => {
  const user_id = req.session.userId;
  const category = req.body.category;
  todosQueries
    .toDosByCategory(user_id, category)
    .then((todos) => {
      if (todos) {
        return res.status(200).json(todos);
      } else {
        return res.status(404).json({ error: "No todos found" });
      }
    })
    .catch((e) => res.status(500).json({ error: "Internal server error" }));
});

// Search todos for a given user/searching key
router.get("/searchToDos", (req, res) => {
  const user_id = req.body.user_id;
  const searching_key = req.body.searching_key;
  todosQueries
    .searchToDos(user_id, searching_key)
    .then((todos) => {
      if (todos) {
        return res.status(200).json(todos);
      } else {
        return res.status(404).json({ error: "No todos found" });
      }
    })
    .catch((e) => res.status(500).json({ error: "Internal server error" }));
});


module.exports = router;
