// Client facing scripts here
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('myModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.querySelector('.login-modal-container .close');

  openModalBtn.addEventListener('click', function() {
      modal.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', function() {
      modal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });
});