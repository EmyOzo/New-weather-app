function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temprature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let weatherCondition = document.querySelector("#weather-condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windy");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");

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
  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "8fc7b0cb70e00c633od459d453bbta45";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        ` <div class="col-2">
                <div class="row"> <span class="weather-forecast-day">${formatDay(
                  day.time
                )}</span>

 <img src="${day.condition.icon_url} "class ="icon" />


<span class="weather-forecast-temp">
<span class="weather-forecast-max">${Math.round(
          day.temperature.maximum
        )}° -- </span>
 <span class="weather-forecast-min">${Math.round(
   day.temperature.minimum
 )}°</span>
 </span>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", startSearch);

searchCity("London");
