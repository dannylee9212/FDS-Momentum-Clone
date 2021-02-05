import { doc } from "prettier";

const weatherHandler = () => {
  // default location: Seoul
  let lat = 37.532600;
  let lon = 127.024612;
  // template
  /*
  `<ul class="forecast__list-items selected">
  <span class="forecast__label">TUE</span>
  <span class="forecast__icon"><img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon"></span>
  <span class="forecast__high">-2°</span>
  <span class="forecast__low">-2°</span>
  </ul>`;
  */
  const getCurrWeather = async (lat, lon) => {
    const currData = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a0542651a9f965001a4d891288d5dee2&units=metric`);
    console.dir(currData.body);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
    });

    getCurrWeather(lat, lon);
  };

  const getForecast = async () => {};

  document.addEventListener('DOMContentLoaded', getLocation);
};

export default weatherHandler;
