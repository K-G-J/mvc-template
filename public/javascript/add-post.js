async function newFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="post-title"]').value;
  const text = document.querySelector('textarea[name="post-text"]').value.trim();
  const post_url = document.querySelector('input[name="post-url"]').value;
  console.log(text)
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_url,
      text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}
document.querySelector('#create-new').addEventListener('click', function () {
  const formDiv = document.getElementById('new-post-form')
  formDiv.style.display = 'block';
});
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
