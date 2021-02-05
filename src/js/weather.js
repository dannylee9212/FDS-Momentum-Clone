import { doc } from "prettier";
const $weatherBtn = document.querySelector('.weather__button');
const $weatherAppCurr = document.querySelector('.weather__current');

const weatherHandler = () => {
  const getCurrWeather = async (lat, lon) => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a0542651a9f965001a4d891288d5dee2&units=metric`);
    const currData = await res.json();

    $weatherBtn.innerHTML = `<div class="weather__tab-info">
    <span class="weather__button-icon"><img src="http://openweathermap.org/img/wn/${currData.weather[0].icon}@2x.png" alt="weather icon"></span>
    <span class="weather__stat-number">${Math.round(currData.main.temp)}°</span>
  </div>
  <span class="weather__city">${currData.name}</span>`;

    $weatherAppCurr.innerHTML = `<header class="weather__current-header">
    <p class="weather__current-city">${currData.name}</p>
    <p class="weather__condition">${currData.weather[0].description}</p>
  </header>
  <div class="weather__app-info">
    <span class="app__icon"><img src="http://openweathermap.org/img/wn/${currData.weather[0].icon}@2x.png" alt="weather icon"></span>
    <span class="app__stat-number">${Math.round(currData.main.temp)}°</span>
    <span class="app__stat-number-pm"></span>
  </div>`;
  };

  const getLocation = () => {
    // default location: Seoul
    let lat = 37.532600;
    let lon = 127.024612;

    navigator.geolocation.getCurrentPosition(pos => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      getCurrWeather(lat, lon);
    });
    getCurrWeather(lat, lon);
  };

  // const getForecast = async () => {};

  document.addEventListener('DOMContentLoaded', getLocation);

  // list items template
  /*
  `<ul class="forecast__list-items selected">
  <span class="forecast__label">TUE</span>
  <span class="forecast__icon"><img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon"></span>
  <span class="forecast__high">-2°</span>
  <span class="forecast__low">-2°</span>
  </ul>`;
  */
};

export default weatherHandler;
