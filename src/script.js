// Feature #1

function showCurrentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = date.getHours();
  if (hour === 0) {
    hour = `24`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  let fullDate = `${day} ${hour}:${minutes}`;
  return fullDate;
}
let currentDate = document.querySelector("#date-time");
currentDate.innerHTML = showCurrentDate(new Date());

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weeklyForecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="70px"
        class="forecast-icon"
      />
      <div class="weather-forecast-temperature">
        <span class="forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a1880a0df562212e1b2958b05ae795d4";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

// Feature #2

function showCityTemp(response) {
  celsiusTemperature = response.data.main.temp;
  let displayCityTemp = document.querySelector("#format-temp");
  displayCityTemp.innerHTML = Math.round(celsiusTemperature);
  //👇👇👇 this is also another format which makes your code even easier to read
  document.querySelector(
    "#humidity-value"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  // displayHumidity.innerHTML = `Humidity: ${cityHumidity}%`;
  let weatherDescription = response.data.weather[0].description;
  let displayWeatherDescription = document.querySelector(
    "#forecast-description"
  );
  displayWeatherDescription.innerHTML = weatherDescription;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  let cityWindSpeed = Math.round(response.data.wind.speed);
  let displayWindSpeed = document.querySelector("#wind-value");
  displayWindSpeed.innerHTML = `Wind: ${cityWindSpeed} m/s`;
  let locationName = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = locationName;
  getForecast(response.data.coord);
}
function submitCity(city) {
  let apiKey = "a1880a0df562212e1b2958b05ae795d4";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemp);
}

// 👇👇 will overide default city upon "submit" of search form
function handleSubmit(event) {
  event.preventDefault();
  let searchCityName = document.querySelector("#search-city").value;
  submitCity(searchCityName);
}

let searchCity = document.querySelector("#city-form");
searchCity.addEventListener("submit", handleSubmit);

function showLocation(event) {
  let latitude = event.coords.latitude;
  let longitude = event.coords.longitude;
  console.log(latitude);
  let apiKey = "a1880a0df562212e1b2958b05ae795d4";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemp);
}

function getLocalForecast() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

function clickFarenheit(event) {
  event.preventDefault();
  let farenheitTemp = document.querySelector("#format-temp");
  tempCel.classList.remove("active");
  tempFar.classList.add("active");
  farenheitTemp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function clickCelcius(event) {
  event.preventDefault();
  let celciusTemp = document.querySelector("#format-temp");
  tempCel.classList.add("active");
  tempFar.classList.remove("active");
  celciusTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let tempFar = document.querySelector("#farenheit-unit");
tempFar.addEventListener("click", clickFarenheit);

let tempCel = document.querySelector("#celcius-unit");

tempCel.addEventListener("click", clickCelcius);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocalForecast);
// 👇👇👇 this will make Toronto default city upon load/refresh
submitCity("Toronto");
