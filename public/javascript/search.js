async function searchFormHandler() {
  const title = document.querySelector('input[name="query"]').value.trim();
  const response = await fetch(`/search/${title}`)
  if (response.ok) {
    console.log('sucess');
  } else {
    alert(response.statusText);
  }
};
document.querySelector('.search-form').addEventListener('submit', searchFormHandler);