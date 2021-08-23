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

function showCityTemp(response) {
  let cityTemperature = Math.round(response.data.main.temp);
  let displayCityTemp = document.querySelector("#format-temp");
  displayCityTemp.innerHTML = `${cityTemperature}℃`;
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
  let cityWindSpeed = Math.round(response.data.wind.speed);
  let displayWindSpeed = document.querySelector("#wind-value");
  displayWindSpeed.innerHTML = `Wind: ${cityWindSpeed} m/s`;
  let locationName = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = locationName;
  // console.log(cityWindSpeed);
}
// week 5 homework

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

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocalForecast);
// 👇👇👇 this will make Toronto default city upon load/refresh
submitCity("Toronto");

// // Feature #3
// function clickCelcius(event) {
//   event.preventDefault();
//   let celciusTemp = document.querySelector("#format-temp");
//   celciusTemp.innerHTML = "30℃";
// }

// function clickFarenheit(event) {
//   event.preventDefault();
//   let farenheitTemp = document.querySelector("#format-temp");
//   farenheitTemp.innerHTML = "86℉";
// }

// let tempCel = document.querySelector("#celcius-unit");
// let tempFar = document.querySelector("#farenheit-unit");

// tempCel.addEventListener("click", clickCelcius);
// tempFar.addEventListener("click", clickFarenheit);
