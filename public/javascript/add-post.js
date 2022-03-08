async function newFormHandler(event) {
  event.preventDefault();
  const form = document.querySelector('.new-post-form');
    const formData = new FormData(form);
    axios
      .post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res);
        document.location.replace('/');
      })
      .catch((err) => {
        console.log(err);
      });
}
document.querySelector('#add-new').addEventListener('click', function () {
  const formDiv = document.getElementById('new-post-form')
  formDiv.style.display = 'block';
});
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
document.querySelector('#create-new').addEventListener('submit', newFormHandler);
