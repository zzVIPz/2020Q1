import getCardOfThreeDayForecastTemplate from './modules/getCardOfThreeDayForecastTemplate';
import getImageSrcTemplate from './modules/getImageSrcTemplate';
import drawMap from './modules/renderMap';
import getCorrectDate from './modules/getCorrectDate';

class View {
  constructor() {
    this.weatherCity = document.querySelector('.weather__city');
    this.weatherCountry = document.querySelector('.weather__country');
    this.weatherDate = document.querySelector('.weather__date');
    this.weatherImage = document.querySelector('.weather__image');
    this.weatherTemp = document.querySelector('.weather__temp');
    this.weatherDescription = document.querySelector('.weather__description');
    this.weatherApparentTemp = document.querySelector('.weather__apparent_temp');
    this.weatherWindSpeed = document.querySelector('.weather__wind_speed');
    this.weatherRelativeHumidity = document.querySelector('.weather__relative_humidity');
    this.weatherThreeDayForecast = document.querySelector('.weather__three-day-forecast');
  }

  init() {}

  dateRender(language) {
    this.weatherDate.innerText = getCorrectDate(language);
  }

  locationInfoRender(cityInfo) {
    console.log('cityInfo', cityInfo);
    const { components } = cityInfo.results[0];
    this.weatherCity.innerText = components.city;
    this.weatherCountry.innerText = components.country;
  }

  dailyForecastRender(template, description, weatherData) {
    console.log('weatherDataRender', weatherData);
    const param = weatherData.data[0];
    const imageSrcTemplate = getImageSrcTemplate(template, param.weather.icon);
    this.weatherImage.innerHTML = imageSrcTemplate;
    this.weatherTemp.innerText = Math.ceil(param.temp);
    this.weatherDescription.innerText = param.weather.description.toUpperCase();
    this.weatherApparentTemp.innerText = `${description[0]} ${Math.ceil(param.app_temp)}°`;
    this.weatherWindSpeed.innerText = `${description[1]} ${Math.ceil(param.wind_spd)} ${
      description[2]
    }`;
    this.weatherRelativeHumidity.innerText = `${description[3]} ${Math.ceil(param.rh)}%`;
  }

  threeDayForecastAPIUrl(template, weatherData) {
    // todo: check is correct data in 3days request
    this.weatherThreeDayForecast.innerHTML = '';
    weatherData.data.forEach((data, index) => {
      if (index) {
        const param = weatherData.data[index];
        const day = param.ts;
        const { temp } = param;
        const { icon } = param.weather;
        const cardTemplate = getCardOfThreeDayForecastTemplate(template, day, temp, icon);
        this.weatherThreeDayForecast.innerHTML += cardTemplate;
      }
    });
    console.log('threeDayForecastAPIUrl', weatherData);
  }

  renderMap(location) {
    drawMap(location);
  }
}

export default View;
