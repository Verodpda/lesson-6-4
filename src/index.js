//time and date
let currentDate = new Date();
let h2 = document.querySelector("h2");
let daysWeek =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = daysWeek[currentDate.getDay()];
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
if (minutes > 10) {
h2.innerHTML = `${day} ${hour}:${minutes}`;
} else {
h2.innerHTML = `${day} ${hour}:0${minutes}`;
}

//search button
function citySubmit(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityHTML = document.querySelector("h1");
  cityHTML.innerHTML = (`${cityInput.value}`)

  function displayCityWeather (response){
      let currentTemp = document.querySelector("#current-temp");
      currentTemp.innerHTML = `${Math.round(response.data.main.temp_max)}/${Math.round(response.data.main.temp_min)}`;

      let currentHumidity = document.querySelector("#humidity");
      currentHumidity.innerHTML = `${response.data.main.humidity}%`;

      let currentWindSpeed = document.querySelector("#wind");
      currentWindSpeed.innerHTML = `${Math.round(response.data.wind.speed)} Km/h`

      let weatherDescription = document.querySelector("#weather-description");
      weatherDescription.innerHTML = (response.data.weather[0].description);

  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=70a117d10548a7cde81c5d73ab55d01b&units=metric`;
  axios.get(apiUrl).then(displayCityWeather)
}

let cityForm = document.querySelector("#city-search");
cityForm.addEventListener("submit", citySubmit);

//current button
function showLocation (){
  function currentPosition (position){
      function displayCityWeather (response){
      let currentTemp = document.querySelector("#current-temp");
      currentTemp.innerHTML = `${Math.round(response.data.main.temp_max)}/${Math.round(response.data.main.temp_min)}`;

      let currentHumidity = document.querySelector("#humidity");
      currentHumidity.innerHTML = `${response.data.main.humidity}%`;

      let currentWindSpeed = document.querySelector("#wind");
      currentWindSpeed.innerHTML = `${Math.round(response.data.wind.speed)} Km/h`

      let weatherDescription = document.querySelector("#weather-description");
      weatherDescription.innerHTML = (response.data.weather[0].description);

      let cityName = document.querySelector("h1");
      cityName.innerHTML = response.data.name;

  }
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=70a117d10548a7cde81c5d73ab55d01b&units=metric`;
   axios.get(apiUrl).then(displayCityWeather)
  }
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", showLocation);

showLocation();