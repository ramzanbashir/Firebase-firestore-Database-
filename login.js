document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Redirecting to dashboard...',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = 'dashboard.html';
      });
    });
  }
});