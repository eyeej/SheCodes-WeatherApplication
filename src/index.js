function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");


    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = temperature;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
   
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
  
    if (minutes < 10) {
    minutes = `0${minutes}`;

    }

    return `${day} ${hours}:${minutes}`;
}


function searchCity(city) {
    let apiKey = "t9e9139a19b801fbcfa020d17a47ob1f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather)
 
    getForecast(city);
       
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);

}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "t9e9139a19b801fbcfa020d17a47ob1f";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    
}

function displayForecast(response) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml =
         forecastHtml +
            `
            <div class="weather-forecast-day">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>

                 <img src ="${day.condition.icon_url}" class="weather-forecast-icon" />
                <div class="weather-forecast-temperatures">
                    <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}º</strong></div>
                    <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
              </div>
         </div>
            `;
           }
         });
    
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;

    }

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Sydney");