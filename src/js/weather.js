import { doc } from 'prettier';
import ACCESS_KEY_FOR_WEATHERDATA from './utils/constants';

const $weatherBtn = document.querySelector('.weather__button');
const $weatherAppCurr = document.querySelector('.weather__current');

const weatherHandler = () => {
  const renderCurr = currData => {
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

  const renderForecast = () => {};

  const getCurrWeather = async (lat, lon) => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a0542651a9f965001a4d891288d5dee2&units=metric`);
    const currData = await res.json();

    renderCurr(currData);
  };

  const setEachDayInfo = ({ list }) => {
    // daily info
    const day0Info = [];
    const day1Info = [];
    const day2Info = [];
    const day3Info = [];
    const day4Info = [];

    list.forEach(unitData => {
      const today = (new Date()).getDay();
      const day = (new Date(unitData.dt_txt)).getDay();
      const from0To6 = num => {
        if (num > 6) return num - 7;
        // today는 최대가 6
        return num;
      };

      if (day === today) day0Info.push(unitData);
      else if (day === from0To6(today + 1)) day1Info.push(unitData);
      else if (day === from0To6(today + 2)) day2Info.push(unitData);
      else if (day === from0To6(today + 3)) day3Info.push(unitData);
      else day4Info.push(unitData);
    });

    const dailyInfos = [day0Info, day1Info, day2Info, day3Info, day4Info];

    // get daily min, max temp
    const getDailyMinTemp = dayInfo => {
      return dayInfo.reduce((minTemp, { main }) => {
        if (main.temp_min < minTemp) return main.temp_min;
        return minTemp;
      }, Infinity);
    };
    const getDailyMaxTemp = dayInfo => {
      return dayInfo.reduce((maxTemp, { main }) => {
        if (main.temp_max > maxTemp) return main.temp_max;
        return maxTemp;
      }, -Infinity);
    };

    const dailyMinTemp = dailyInfos.map(dayInfo => getDailyMinTemp(dayInfo));
    const dailyMaxTemp = dailyInfos.map(dayInfo => getDailyMaxTemp(dayInfo));

    console.dir(day0Info);
    console.dir(dailyMinTemp);
    console.dir(dailyMaxTemp);
  };

  const getForecast = async (lat, lon) => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a0542651a9f965001a4d891288d5dee2&units=metric`);
    const forecastData = await res.json();
    setEachDayInfo(forecastData);
    // renderForecast(forecastData);
    // 템플릿
    /*
    `<ul class="forecast__list-items selected">
    <span class="forecast__label">TUE</span>
    <span class="forecast__icon"><img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon"></span>
    <span class="forecast__high">-2°</span>
    <span class="forecast__low">-2°</span>
    </ul>`;
    */
  };

  const getLocation = () => {
    // default location: Seoul
    let lat = 37.532600;
    let lon = 127.024612;

    navigator.geolocation.getCurrentPosition(pos => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      getCurrWeather(lat, lon);
      getForecast(lat, lon);
    });

    getCurrWeather(lat, lon);
    getForecast(lat, lon);
  };

  document.addEventListener('DOMContentLoaded', getLocation);
};

export default weatherHandler;
