import getCardOfThreeDayForecastTemplate from './modules/getCardOfThreeDayForecastTemplate';

class View {
  constructor() {
    this.weatherCity = document.querySelector('.weather__city');
    this.weatherCountry = document.querySelector('.weather__country');
    this.weatherDate = document.querySelector('.weather__date');
    this.weatherTemp = document.querySelector('.weather__temp');
    this.weatherDescription = document.querySelector('.weather__description');
    this.weatherApparentTemp = document.querySelector('.weather__apparent_temp');
    this.weatherWindSpeed = document.querySelector('.weather__wind_speed');
    this.weatherRelativeHumidity = document.querySelector('.weather__relative_humidity');
    this.weatherThreeDayForecast = document.querySelector('.weather__three-day-forecast');
  }

  init() {}

  dateRender() {
    setInterval(() => {
      //todo: add fn traslete date
      const date = String(new Date()).split(' ');
      const formattedDate = `${date[0]} ${date[2]} ${date[1]} ${date[4]}`;
      this.weatherDate.innerText = formattedDate;
    }, 1000);
  }

  locationInfoRender(cityInfo) {
    console.log('cityInfo', cityInfo);
    const { components } = cityInfo.results[0];
    this.weatherCity.innerText = components.city;
    this.weatherCountry.innerText = components.country;
  }

  dailyForecastRender(weatherData) {
    console.log('weatherDataRender', weatherData);
    const param = weatherData.data[0];
    this.weatherTemp.innerText = Math.ceil(param.temp);
    this.weatherDescription.innerText = param.weather.description;
    this.weatherApparentTemp.innerText = Math.ceil(param.app_temp);
    this.weatherWindSpeed.innerText = Math.ceil(param.wind_spd);
    this.weatherRelativeHumidity.innerText = Math.ceil(param.rh);
  }

  threeDayForecastAPIUrl(template, weatherData) {
    // todo: check is correct data in 3days request
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
}

export default View;
