const { response } = require("express");

document.addEventListener('DOMContentLoaded', function () {
  const todoModal = document.getElementById('editModal');
  const openTodoModalBtns = document.querySelectorAll('.fa-edit');
  const closeTodoModalBtn = document.querySelector('#editModal .close');

  openTodoModalBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      // Open modal for the specific todo by finding the closest <li> element to it
      const todoItem = e.target.closest('li');
      const todoDescription = todoItem.querySelector('.todo-list-name p').innerText;
      const todoCategory = document.querySelector('.category-title').innerText;
      const todoId = todoItem.dataset.id;
      const todoTitle = todoItem.dataset.title;

      // Populate modal form fields
      const categorySelect = document.getElementById('category');
      categorySelect.value = todoCategory;
      document.getElementById('todo').value = todoDescription;
      document.getElementById('todoId').value = todoId;
      document.getElementById('todoTitle').value = todoTitle;

      todoModal.style.display = 'block';
    });
  });

  closeTodoModalBtn.addEventListener('click', function () {
    todoModal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === todoModal) {
      todoModal.style.display = 'none';
    }
  });

  document.getElementById('saveEditBtn').addEventListener('click', function (e) {
    e.preventDefault();

    const id = document.getElementById('todoId').value;
    const title = document.getElementById('todoTitle').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('todo').value;

    fetch('/api/todos/updateToDo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, title, category, details: description })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error updating todo:', data.error);
        } else {
          console.log('Todo updated successfully:', data);
          // Hide the modal
          todoModal.style.display = 'none';

          // Refresh the page to reflect changes
          location.reload();
        }
      })
      .catch(error => console.error('Error:', error));
  });

// Add event listeners to each category item
  const categoryItems = document.querySelectorAll('.category-links--item');
  categoryItems.forEach(item => {
    item.addEventListener('click', async function (e) {
      try {
        // use the inner .category-btn inside the clicked link to get the category
        const categoryBtn = item.querySelector('.category-btn');
        const category = categoryBtn.innerHTML.trim();

        const response = await fetch('/api/todos/toDosByCategory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ category })
        });
        const todos = await response.json();
        console.log('result of response json:', todos);

        // Empty all the li from ul for todo list
        const todoList = document.querySelector('.todo-list');
        todoList.innerHTML = '';

        // Change category title to category we clicked
        const categoryTitle = document.querySelector('.category-title');
        categoryTitle.innerText = category;

        if (todos.length > 0) {
          todos.forEach(todo => {
            const todoItem = document.createElement('li');
            // Set the data not displayed into the dataset for later use
            todoItem.dataset.id = todo.id;
            todoItem.dataset.title = todo.title;
            todoItem.innerHTML = `
            <div class="todo-list-name">
              <input type="checkbox">
              <p>${todo.details}</p>
            </div>
            <div class="todo-list-edit">
              <i class="fas fa-edit"></i>
              <i class="fa-solid fa-trash"></i>
            </div>
          `;
            todoList.appendChild(todoItem);
          });

          // Re-attach event listeners for the edit buttons after dynamically adding them
          const newOpenTodoModalBtns = todoList.querySelectorAll('.fa-edit');
          newOpenTodoModalBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
              const todoItem = e.target.closest('li');
              const todoDescription = todoItem.querySelector('.todo-list-name p').innerText;
              const todoCategory = categoryTitle.innerText;
              const todoId = todoItem.dataset.id;

              document.getElementById('category').value = todoCategory;
              document.getElementById('todo').value = todoDescription;
              document.getElementById('todoId').value = todoId;
              document.getElementById('todoTitle').value = todoDescription;

              todoModal.style.display = 'block';
            });
          });

        } else {
          todoList.innerHTML = `<p>No todos found for this category.</p>`;
        }

      } catch (error) {
        console.error(error.message);
      }
    });
  });


  const logoutBtn = document.querySelector('.btn-logout');
  if (logoutBtn) {
    console.log("logout found");
    logoutBtn.addEventListener('click', function() {
      fetch('api/users/logout', {
        method: 'POST',
        credentials: 'same-origin'
      })
        .then(response => {
          window.location.href = '/';
        })
        .catch(error => console.error('Error:', error));
    });
  }

  const addTodoBtn = document.getElementById('addTodo');
  addTodoBtn.addEventListener('click', async function(e) {
    try {
      console.log('add todo button:', e.target.previousElementSibling.value)
      const addTodoText = e.target.previousElementSibling.value;
      const response = await fetch('/api/todos/addToDo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({enquire: addTodoText})
      })
    } catch (error) {
      console.error(error.message);
    }
    const todo = await response.json();
    
  })

});

