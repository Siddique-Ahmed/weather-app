let apiKey = `e36dfb1c2af1f37f6fb762467dcb784e`;
let cityInp = document.querySelector("#search");

async function getDataFromApi(city) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );

  if (!response.ok) {
    swal.fire("City Not Found!");
    return;
  }
  let data = await response.json();
  console.log(data);
  displayData(data);
}
inputDisp();

let temprature = document.querySelector(".temp");
let cityName = document.querySelector(".city");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let icon = document.querySelector(".weather-icon");
let weather = document.querySelector(".weather");

function displayData(data) {
  temprature.innerHTML = `${Math.floor(data.main.temp)}<sup>°C</sup>`;
  cityName.textContent = `${data.name} ${data.sys.country}`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${Math.floor(data.wind)} km/h`;
  if (data.weather[0].main == "Clouds") {
    icon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    icon.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    icon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    icon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    icon.src = "images/mist.png";
  }

  weather.style.display = "block";
}

function inputDisp() {
  let city = document.querySelector("#search").value.trim();

  if (!city == "") {
    getDataFromApi(city);
    cityInp.value = "";
  }
}

let searchBtn = document.querySelector("#seachBtn");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inputDisp();
});
