import getCardOfThreeDayForecastTemplate from './modules/getCardOfThreeDayForecastTemplate';
import getIconSrcTemplate from './modules/getIconSrcTemplate';
import drawMap from './modules/renderMap';
import setCorrectDate from './modules/setCorrectDate';
import getFormattedCoordinates from './modules/getFormattedCoordinates';
import getPlaceholderValue from './modules/getPlaceholderValue';
import checkDate from './modules/checkDate';

class View {
  constructor() {
    this.loaderContainer = document.querySelector('.loader-container');
    this.search = document.querySelector('.search');
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
    this.latitude = document.querySelector('.geographic__latitude');
    this.longitude = document.querySelector('.geographic__longitude');
  }

  init(loader) {
    this.loaderContainer.innerHTML = loader;
  }

  setPlaceholderValue(language) {
    const placeholderValue = getPlaceholderValue(language);
    this.search.setAttribute('placeholder', placeholderValue);
  }

  dateRender(language, timezone) {
    this.weatherDate.innerText = setCorrectDate(language, this.weatherDate, timezone);
  }

  locationInfoRender(cityInfo, language) {
    console.log('cityInfoDraw', cityInfo);
    const { components } = cityInfo.results[0];
    const [latitude, longitude] = getFormattedCoordinates(
      cityInfo.results[0].bounds.northeast,
      language,
    );
    this.weatherCity.innerText = components.town || components.state || components.city;
    this.weatherCountry.innerText = components.country;
    this.latitude.innerText = latitude;
    this.longitude.innerText = longitude;
  }

  dailyForecastRender(template, description, weatherData) {
    //todo: need refartor - get forrmated string
    console.log('weatherDataRender', weatherData);
    const param = weatherData.data[0];
    const spanTag = `<span class="temp-value">{value}</span>`;
    const imageSrcTemplate = getIconSrcTemplate(template, param.weather.icon);
    this.weatherImage.innerHTML = imageSrcTemplate;
    this.weatherTemp.innerHTML = spanTag.replace(/\{value\}/g, Math.ceil(param.temp));
    this.weatherDescription.innerText = param.weather.description.toUpperCase();
    this.weatherApparentTemp.innerHTML = `${description[0]} ${spanTag.replace(
      /\{value\}/g,
      Math.ceil(param.app_temp),
    )}°`;
    this.weatherWindSpeed.innerText = `${description[1]} ${Math.ceil(param.wind_spd)} ${
      description[2]
    }`;

    this.weatherRelativeHumidity.innerText = `${description[3]} ${Math.ceil(param.rh)}%`;
  }

  threeDayForecastRender(template, weatherData, language) {
    this.weatherThreeDayForecast.innerHTML = '';
    let counter = 0;
    console.log('threeDayForecastAPIUrl', weatherData);
    weatherData.data.forEach((data, index) => {
      if (index && checkDate(weatherData.timezone, data) && counter < 3) {
        counter += 1;
        const param = weatherData.data[index];
        const date = param.datetime.split('-');
        const { temp } = param;
        const { icon } = param.weather;
        const cardTemplate = getCardOfThreeDayForecastTemplate(
          template,
          date,
          temp,
          icon,
          language,
        );
        this.weatherThreeDayForecast.innerHTML += cardTemplate;
      }
    });
  }

  renderMap(location) {
    drawMap(location);
  }
}

export default View;
