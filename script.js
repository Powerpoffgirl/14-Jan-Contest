const button = document.getElementById("button");
const weatherData = document.getElementById("weatherData");
const weatherTable = document.getElementById("weatherTable");
const map = document.getElementById("map");
const mapLocation = document.getElementById("mapLocation");
const innerContainer = document.getElementById("innerContainer");
const body = document.getElementsByTagName("body");
let lat1 = document.getElementById("lat");
const long1 = document.getElementById("long");

button.addEventListener("click", fetchData);
button.addEventListener("click", renderWeather);

innerContainer.style.visibility = "hidden";
// 1. Information is fetch and stored
let mapPoint = {}; // To store geo location
let weather = {}; // To store weather information

function fetchData() {
  fetch(
    "https://api.ipgeolocation.io/ipgeo?apiKey=d83a4d2b5e144c02aa57d007f8e77c7e"
  )
    .then((response) => response.json())
    .then((data) => {
      mapPoint = data;
      console.log(mapPoint);
      console.log(mapPoint.city);
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=19.12418&lon=73.00551&appid=e1b190852dfe84106bb930adbf1f1498"
      )
        .then((response) => response.json())
        .then((data) => {
          weather = data;
          console.log(weather);
          console.log(weather.coord);
          console.log(weather.coord.lon);
          console.log(weather.coord.lat);
          console.log(weather.timezone);
          console.log(weather.wind.speed);
          console.log(weather.main.feels_like);
          renderWeather(weather);
        });
    });
}

function renderWeather() {
  innerContainer.style.visibility = "visible";
  button.style.visibility = "hidden";
  weatherData.innerHTML = "";
  lat1.innerHTML = mapPoint.latitude;
  long1.innerHTML = mapPoint.longitude;
  map.src = `https://maps.google.com/maps?q=${mapPoint.latitude},${mapPoint.longitude}&z=15&output=embed`;

  let tableHeading = document.createElement("h1");
  let cityName = document.createElement("tr");
  let coord = document.createElement("tr");
  let lat = document.createElement("td");
  let long = document.createElement("td");
  let timeZone = document.createElement("tr");
  let windSpeed = document.createElement("tr");
  let pressure = document.createElement("tr");
  let humidity = document.createElement("tr");
  let windDirection = document.createElement("tr");
  let feelsLike = document.createElement("tr");
  let UVIndex = document.createElement("tr");

  tableHeading.innerHTML = "Weather Data";
  lat.innerText = " Lat: " + mapPoint.latitude;
  long.innerText = " Long: " + mapPoint.longitude;
  coord.append(lat);
  coord.append(long);
  coord.className = "mystyle";
  cityName.innerText = " Location: " + mapPoint.city;
  timeZone.innerText = " Time Zone: " + weather.timezone;
  windSpeed.innerText = " Wind Speed: " + weather.wind.speed;
  pressure.innerText = " Pressure: " + weather.main.pressure;
  humidity.innerText = " Humidity: " + weather.main.humidity;
  windDirection.innerText = " Wind direction: " + weather.wind.deg;
  UVIndex.innerText = " UV index: ";
  feelsLike.innerText = " Feel like: " + weather.main.feels_like;

  weatherData.append(tableHeading);
  weatherTable.append(cityName);
  weatherTable.append(coord);
  weatherTable.append(timeZone);
  weatherTable.append(windSpeed);
  weatherTable.append(pressure);
  weatherTable.append(humidity);
  weatherTable.append(windDirection);
  weatherTable.append(UVIndex);
  weatherTable.append(feelsLike);

  // weatherTable.style.marginBottom = "200vh";
  weatherData.append(weatherTable);
}
