document.addEventListener('DOMContentLoaded', function () {
  initializeTodoModal();
  initializeCategoryItems();
  initializeLogout();
  initializeAddTodo();
  initializeEditUserModal();
  initializeSearch();
});

function initializeTodoModal() {
  const todoModal = document.getElementById('editModal');
  const openTodoModalBtns = document.querySelectorAll('.fa-edit');
  const closeTodoModalBtn = document.querySelector('#editModal .close');

  openTodoModalBtns.forEach(btn => {
    btn.addEventListener('click', openTodoModal);
  });

  closeTodoModalBtn.addEventListener('click', () => {
    todoModal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === todoModal) {
      todoModal.style.display = 'none';
    }
  });

  document.getElementById('saveEditBtn').addEventListener('click', saveTodoEdit);
}

function openTodoModal(e) {
  const todoModal = document.getElementById('editModal');
  const todoItem = e.target.closest('li');
  const todoDescription = todoItem.querySelector('.todo-list-name p').innerText;
  const todoCategory = todoItem.dataset.category;
  const todoId = todoItem.dataset.id;
  const todoTitle = todoItem.dataset.title;

  // Populate modal form fields
  const categorySelect = document.getElementById('category');
  categorySelect.value = todoCategory;
  document.getElementById('todo').value = todoDescription;
  document.getElementById('todoId').value = todoId;
  document.getElementById('todoTitle').value = todoTitle;

  todoModal.style.display = 'block';
}


async function saveTodoEdit(e) {
  e.preventDefault();

  const todoModal = document.getElementById('editModal');
  const id = document.getElementById('todoId').value;
  const title = document.getElementById('todoTitle').value;
  const category = document.getElementById('category').value;
  const description = document.getElementById('todo').value;

  try {
    const response = await fetch('/api/todos/updateToDo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, title, category, details: description })
    });
    const data = await response.json();
    if (data.error) {
      console.error('Error updating todo:', data.error);
    } else {
      console.log('Todo updated successfully:', data);
      todoModal.style.display = 'none';
      location.reload(); // Refresh the page to reflect changes
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function initializeCategoryItems() {
  const categoryItems = document.querySelectorAll('.category-links--item');
  categoryItems.forEach(item => {
    item.addEventListener('click', handleCategoryClick);
  });
}

async function handleCategoryClick(e) {
  try {
    const item = e.currentTarget;
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

    updateTodoList(todos, category);
  } catch (error) {
    console.error(error.message);
  }
}

function updateTodoList(todos, category) {
  const todoList = document.querySelector('.todo-list');
  todoList.innerHTML = '';

  const categoryTitle = document.querySelector('.category-title');
  categoryTitle.innerText = category;

  if (todos.length > 0) {
    todos.forEach(todo => {
      const todoItem = document.createElement('li');
      todoItem.dataset.id = todo.id;
      todoItem.dataset.title = todo.title;
      todoItem.dataset.category = todo.category;
      todoItem.innerHTML = `
        <div class="todo-list-name">
          <input type="checkbox" class="todo-checkbox" ${todo.complete_date ? 'checked' : ''}>
          <p>${todo.details}</p>
        </div>
        <div class="todo-list-edit">
          <i class="fas fa-edit"></i>
          <i class="fa-solid fa-trash"></i>
        </div>
      `;
      todoList.appendChild(todoItem);
    });

    attachDynamicTodoEventListeners(todoList);
  } else {
    todoList.innerHTML = `<p class="noTodos">No todos found for this category.</p>`;
  }
}


function attachDynamicTodoEventListeners(todoList) {
  const newOpenTodoModalBtns = todoList.querySelectorAll('.fa-edit');
  newOpenTodoModalBtns.forEach(btn => {
    btn.addEventListener('click', openTodoModal);
  });

  const deleteTodoBtns = todoList.querySelectorAll('.fa-trash');
  deleteTodoBtns.forEach(btn => {
    btn.addEventListener('click', deleteTodo);
  });

  const todoCheckboxes = todoList.querySelectorAll('.todo-checkbox');
  todoCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', toggleTodoComplete);
  });
}

async function deleteTodo(e) {
  try {
    const todoItem = e.target.closest('li');
    const todoId = todoItem.dataset.id;

    const response = await fetch('/api/todos/deleteToDo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: todoId })
    });

    const deleteResponse = await response.json();
    console.log(deleteResponse);
    location.reload();
  } catch (error) {
    console.error(error.message);
  }
}

async function toggleTodoComplete(e) {
  const checkbox = e.target;
  const todoItem = checkbox.closest('li');
  const todoId = todoItem.dataset.id;

  try {
    const url = checkbox.checked ? '/api/todos/completeToDo' : '/api/todos/uncompleteTodo';
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: todoId })
    });

    const result = await response.json();
    if (!response.ok) {
      console.error('Error updating todo status:', result.error);
    } else {
      console.log('Todo status updated successfully:', result);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function initializeLogout() {
  const logoutBtn = document.querySelector('.btn-logout');
  if (logoutBtn) {
    console.log("logout found");
    logoutBtn.addEventListener('click', async function () {
      try {
        await fetch('api/users/logout', {
          method: 'POST',
          credentials: 'same-origin'
        });
        window.location.href = '/';
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
}

function initializeAddTodo() {
  const addTodoBtn = document.getElementById('addTodo');
  addTodoBtn.addEventListener('click', async function (e) {
    try {
      const addTodoText = e.target.previousElementSibling.value;
      const response = await fetch('/api/todos/addToDo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enquire: addTodoText })
      });

      const todo = await response.json();
      console.log(todo);
      window.location.href = '/';
    } catch (error) {
      console.error(error.message);
    }
  });
}

function initializeEditUserModal() {
  const editUserModal = document.getElementById('editUserModal');
  const userEmailSpan = document.querySelector('.user-email');
  const closeEditUserModalBtn = document.querySelector('#editUserModal .close');

  if (userEmailSpan) {
    userEmailSpan.addEventListener('click', openEditUserModal);
  }

  closeEditUserModalBtn.addEventListener('click', () => {
    editUserModal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === editUserModal) {
      editUserModal.style.display = 'none';
    }
  });

  const editUserForm = document.querySelector('#editUserModal form');
  editUserForm.addEventListener('submit', submitEditUserForm);
}

async function openEditUserModal() {
  try {
    const response = await fetch('/api/users/me');
    const data = await response.json();

    if (response.ok) {
      document.getElementById('name').value = data.user.name;
      const editUserModal = document.getElementById('editUserModal');
      editUserModal.style.display = 'block';
    } else {
      console.error('Error fetching user data:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function submitEditUserForm(e) {
  e.preventDefault();

  const userEmailSpan = document.querySelector('.user-email');
  const userId = userEmailSpan.dataset.userId;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`/api/users/${userId}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    });

    const result = await response.json();
    if (response.ok) {
      console.log('User updated successfully:', result);
      const editUserModal = document.getElementById('editUserModal');
      editUserModal.style.display = 'none';
      userEmailSpan.textContent = result.user.email;
    } else {
      console.error('Error updating user:', result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function initializeSearch() {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', async function() {
    const query = searchInput.value.trim();
    if (query.length > 0) {
      try {
        const response = await fetch(`/api/todos/searchToDos?searching_key=${encodeURIComponent(query)}`);
        const todos = await response.json();

        if (response.ok) {
          updateTodoList(todos, 'Search');
        } else {
          console.error('Error fetching search results:', todos.error);
        }
      } catch (error) {
        console.error('Search Error:', error);
      }
    }
    else {
      // return user the last category they were in
      await handleCategoryClick({currentTarget: document.querySelector('.category-links--item')});
    }
  });
}
