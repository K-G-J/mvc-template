async function signupFormHandler(event) {
  event.preventDefault();
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}
document.querySelector('#show-signup-form').addEventListener('click', () => {
  formDiv = document.querySelector('#signup-form');
  formDiv.style.display = 'block';
  document.location.href = '#signup-form';
})

async function loginFormHandler(event) {
  event.preventDefault();
  const email = document.querySelector('#email-login').value.trim();
  const username = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  if (email && password) {
    const response = await fetch('api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      document.querySelector('#invalid-login').innerHTML = 'Invalid credentials, please try again.'
    }
  }
}
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
