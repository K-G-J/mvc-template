function showPassword() {
  var x = document.getElementById('password-change');
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
}
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
async function editAccountHandler(event) {
  event.preventDefault();
  const username = document.querySelector('input[name="username"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();
  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  try {
    const response = await axios.put(`/api/users/${id}`, { username, email, password })
    .then(document.location.replace('/dashboard/'))
  } catch (err) {
    document.querySelector('#invalid').innerHTML = 'Something went wrong, please try again.'
  } 
}

async function deleteAccount() {
  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  try {
    const response = await axios.delete(`/api/users/${id}`)
    .then((document.location.replace('/')))
  } catch (err) {
    document.querySelector('#invalid').innerHTML = 'Something went wrong, please try again.'
  }
}

document.querySelector('.edit-account-form').addEventListener('submit', editAccountHandler);
document.querySelector('#save-btn').addEventListener('click', editAccountHandler);
document.querySelector('#delete-account-btn').addEventListener('click', deleteAccount)
