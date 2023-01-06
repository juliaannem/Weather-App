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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

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
}

function displayTemperature(response) {
  console.log(response.data);
  console.log(response.data.city);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", `${response.data.condition.description}`);

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  getForecast(response.data.city);
}

function getForecast(city) {
  let apiKey = "d301fateao124ea76ce48beb7c353c42";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  console.log(response.data.daily);
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
    
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="50"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("Vancouver");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
