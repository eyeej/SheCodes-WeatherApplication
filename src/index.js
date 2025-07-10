function refreshWeather(response){
    console.log(response.data);

}

function searchCity(city) {
    let apiKey = "t9e9139a19b801fbcfa020d17a470b1f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
   let searchInput = document.querySelector("#search-form-input");
   let cityElement = document.querySelector("#city");
   cityElement.innerHTML = searchInput.value;
   cityElement.innerHTML = city;
   searchCity(city);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);