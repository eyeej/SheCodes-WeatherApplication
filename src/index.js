function refreshWeather(response) {
    let TemperatureElement = document.querySelector("#temperature");
    TemperatureElement.innerHTML = response.data.temperature.current;
}

function searchCity(city) {
    let apiKey = "t9e9139a19b801fbcfa020d17a47ob1f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather); 
}

function handleSearchSubmit(event) {
    event.preventDefault();
   let searchInput = document.querySelector("#search-form-input");
   let cityElement = document.querySelector("#city");
   cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);