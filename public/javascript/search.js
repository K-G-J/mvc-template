async function searchFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="query"]').value.trim();
  try {
    const response = await axios.get(`/search/${title}`)
    console.log('success', response)
  } catch (error) {
    console.log('error', error)
  }
};
document.querySelector('#search-form').addEventListener('submit', searchFormHandler);