function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temprature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temprature);
}

function searchCity(city) {
  let apiKey = "8fc7b0cb70e00c633od459d453bbta45";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function startSearch(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-city");

  searchCity(searchFormInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", startSearch);

searchCity("London");
