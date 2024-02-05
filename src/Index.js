function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temprature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let weatherCondition = document.querySelector("#weather-condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windy");
  let timeElement = document.querySelector("#time");
  let date = response.data.time;
  let currentDate = new Date(date * 1000);
  console.log(currentDate);

  let iconElement = document.querySelector("#icon");
  function formatDate(dates) {
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[currentDate.getDay()];
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
  }

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  weatherCondition.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temprature);
  iconElement.innerHTML = `<img
              src="${response.data.condition.icon_url}"
             class="#icon"
            />`;
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
