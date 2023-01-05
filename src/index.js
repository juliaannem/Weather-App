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

//////////////////////////////////////////////////////////

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");

  console.log(cityInputElement.value);
  search(cityInputElement.value);
}

function search(city) {
  let apiKey = "d301fateao124ea76ce48beb7c353c42";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
  console.log(apiURL);
}

function displayTemperature(response) {
  console.log(response.data);
  console.log(response.data.temperature.humidity);

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.temperature.wind.speed);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", `${response.data.condition.description}`);

  //getForecast(response.data.city);

  //http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png
}

search("Vancouver");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
