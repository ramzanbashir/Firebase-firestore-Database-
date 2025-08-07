document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Normally you'd send this to Firebase or a backend

      Swal.fire({
        icon: 'success',
        title: 'Signup Successful',
        text: 'Redirecting to login...',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = 'login.html';
      });
    });
  }
});
