// Client facing scripts here
document.addEventListener('DOMContentLoaded', function() {
  const loginModal = document.getElementById('loginModal');
  const openLoginModalBtn = document.getElementById('openLoginModalBtn');
  const closeLoginModalBtn = document.querySelector('#loginModal .close');

  openLoginModalBtn.addEventListener('click', function() {
      loginModal.style.display = 'block';
  });

  closeLoginModalBtn.addEventListener('click', function() {
      loginModal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
      if (event.target === loginModal) {
          loginModal.style.display = 'none';
      }
  });

  const registerModal = document.getElementById('registerModal');
  const openRegisterModalBtn = document.getElementById('openRegisterModalBtn');
  const closeRegisterModalBtn = document.querySelector('#registerModal .close');

  openRegisterModalBtn.addEventListener('click', function() {
    registerModal.style.display = 'block';
  });

  closeRegisterModalBtn.addEventListener('click', function() {
    registerModal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target === registerModal) {
      registerModal.style.display = 'none';
    }
  });
});
