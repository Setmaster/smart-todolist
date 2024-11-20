document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('myModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.querySelector('.login-modal-container .close');
  const deleteBtn = document.querySelector('.fa-trash');

  openModalBtn.addEventListener('click', function (e) {
    modal.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
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
        const todos = await response.json()
        console.log('result of response json:', todos)

        // Empty all the li from ul for todolist
        const todoList = document.querySelector('.todo-list');
        todoList.innerHTML = ''

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
                <i id="openModalBtn" class="fas fa-edit"></i>
                <i class="fa-solid fa-trash"></i>
              </div>
            `
            todoList.appendChild(todoItem);
          })
        } else {
          todoList.innerHTML = `<p>No todos found for this category.</p>`;
        }

      } catch (error) {
        console.error(error.message);
      }
    });
  });
});
