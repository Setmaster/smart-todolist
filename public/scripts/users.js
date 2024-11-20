// Add event listeners to each category button
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
  button.addEventListener('click', async function (e) {
    try {
      const category = e.target.innerHTML.trim();
      const response = await fetch('/api/todos/allTodosByCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({category}) // Send the category in the request body
      });
      console.log("fetch return response", response.json());
    } catch (error) {
      console.error(error.message);
    }
  });
});

