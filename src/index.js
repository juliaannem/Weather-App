let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDate(now) {
  let formatDay = days[now.getDay()];
  let formatMonth = months[now.getMonth()];

  let newDate = `${formatDay} ${formatMonth} ${now.getDate()}, ${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}`;
  return newDate;
}
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = formatDate(new Date());

//////////////
function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");

  let displayedCity = document.querySelector("#displayed-city");
  displayedCity.innerHTML = city.value;

  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  function display(response) {
    let h1 = document.querySelector("#current-temp");
    h1.innerHTML = Math.round(response.data.main.temp);
  }

  axios.get(apiURL).then(display);
}

let searchedCity = document.querySelector("#search-engine");
searchedCity.addEventListener("submit", changeCity);

///////////////////
function changeCelsius(event) {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = 4;
}
function changeFarenheight(event) {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = 39.2;
}

let celsius = document.querySelector("#celsius");
let farenheight = document.querySelector("#farenheight");

celsius.addEventListener("click", changeCelsius);
farenheight.addEventListener("click", changeFarenheight);
/////////////////

function currentTemp(response) {
  let longitude = response.coords.longitude;
  let latitude = response.coords.latitude;

  function temp(response2) {
    let temp = document.querySelector("#current-temp");
    temp.innerHTML = response2.data.main.temp;
  }

  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(temp);
}
let button = document.querySelector("button");
button.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(currentTemp)
);
