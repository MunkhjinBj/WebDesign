document.querySelectorAll('.toggle-password').forEach(button => {
  button.addEventListener('click', function () {
    const passwordInput = this.previousElementSibling; // Get the corresponding password input
    const type = passwordInput.type === 'password' ? 'text' : 'password'; // Toggle visibility
    passwordInput.setAttribute('type', type);

    // Toggle eye/eye-slash icon
    this.querySelector('i').classList.toggle('fa-eye');
    this.querySelector('i').classList.toggle('fa-eye-slash');
  });
});
