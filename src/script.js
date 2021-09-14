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

function displayForecast() {
  let forecastElement = document.querySelector("#weeklyForecast");
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="forecast-day">${day}</div>
      <img
        src="http://openweathermap.org/img/wn/02n@2x.png"
        alt=""
        width="70px"
        class="forecast-icon"
      />
      <div class="weather-forecast-temperature">
        <span class="forecast-temp-max">19°</span>
        <span class="forecast-temp-min">10°</span>
      </div>
    </div>`;
  });

  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Feature #2
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

function getForecast(coordinates) {
  let apiKey = "a1880a0df562212e1b2958b05ae795d4";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

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
displayForecast();
