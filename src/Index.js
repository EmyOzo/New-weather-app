function startSearch(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-city");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchFormInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", startSearch);
