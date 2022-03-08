async function searchFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="query"]').value.trim();
  try {
    const res = await axios.get(`/search/${title}`);
    console.log('success', res.data.id);
    document.location.replace(`/post/${res.data.id}`)
  } catch (error) {
    console.log('error', error)
  }
};
document.querySelector('#search-form').addEventListener('submit', searchFormHandler);