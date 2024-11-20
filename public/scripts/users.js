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

      // Populate modal form fields
      document.getElementById('category').value = todoCategory;
      document.getElementById('todo').value = todoDescription;

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

  // Add event listeners to each category button
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(button => {
    button.addEventListener('click', async function (e) {
      try {
        const category = e.target.innerHTML.trim();
        const response = await fetch('/api/todos/toDosByCategory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ category }) // Send the category in the request body
        });
        const todos = await response.json();
        console.log('result of response json:', todos);

        // Empty all the li from ul for todolist
        const todoList = document.querySelector('.todo-list');
        todoList.innerHTML = '';

        // Change category title to category we clicked
        const categoryTitle = document.querySelector('.category-title');
        categoryTitle.innerText = category;

        if (todos.length > 0) {
          todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.innerHTML = `
              <div class="todo-list-name">
                <input type="checkbox">
                <p>${todo.title}</p>
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

              document.getElementById('category').value = todoCategory;
              document.getElementById('todo').value = todoDescription;

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
});
