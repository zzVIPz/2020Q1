import getCardOfThreeDayForecastTemplate from './modules/getCardOfThreeDayForecastTemplate';
import getIconSrcTemplate from './modules/getIconSrcTemplate';
import drawMap from './modules/renderMap';
import setCorrectDate from './modules/setCorrectDate';
import getFormattedCoordinates from './modules/getFormattedCoordinates';

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
    this.latitude = document.querySelector('.geographic__latitude');
    this.longitude = document.querySelector('.geographic__longitude');
  }

  init() {}

  dateRender(language) {
    this.weatherDate.innerText = setCorrectDate(language, this.weatherDate);
  }

  locationInfoRender(cityInfo, language) {
    console.log('cityInfo', cityInfo);
    const { components } = cityInfo.results[0];
    const [latitude, longitude] = getFormattedCoordinates(
      cityInfo.results[0].bounds.northeast,
      language,
    );
    this.weatherCity.innerText = components.city;
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
    // todo: check is correct data in 3days request
    this.weatherThreeDayForecast.innerHTML = '';
    weatherData.data.forEach((data, index) => {
      if (index) {
        const param = weatherData.data[index];
        const day = param.ts;
        const { temp } = param;
        const { icon } = param.weather;
        const cardTemplate = getCardOfThreeDayForecastTemplate(template, day, temp, icon, language);
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
