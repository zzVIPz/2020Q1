import getCorrectUrl from './modules/getCorrectUrl';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.btnChangeBackground = document.querySelector('.button-change-background');
    this.image = document.querySelector('.background');
    this.search = document.querySelector('.search');
    this.language = 'en';
    this.temperature = 'C';
    this.opencagedataAPIUrl = this.model.opencagedataAPIUrl;
    this.dailyForecastAPIUrl = this.model.dailyForecastAPIUrl;
    this.threeDayForecastAPIUrl = this.model.threeDayForecastAPIUrl;
  }

  async init() {
    this.language = localStorage.language || this.language;
    this.temperature = localStorage.temperature || this.temperature;
    this.addListeners();
    const location = await this.getUserLocation();
    const cityInfo = await this.getCityInfo(location);
    const dailyForecast = await this.getWeatherData(this.dailyForecastAPIUrl, location);
    const threeDayForecast = await this.getWeatherData(this.threeDayForecastAPIUrl, location);
    this.renderTemplate(cityInfo, dailyForecast, threeDayForecast, location.loc);
  }

  renderTemplate(cityInfo, dailyForecast, threeDayForecast, location) {
    this.view.dateRender();
    this.view.locationInfoRender(cityInfo);
    this.view.dailyForecastRender(
      this.model.weatherImageTemplate,
      this.model.weatherDescription[this.language],
      dailyForecast,
    );
    this.view.threeDayForecastAPIUrl(this.model.threeDayForecastTemplate, threeDayForecast);
    this.view.renderMap(location);
  }

  addListeners() {
    this.addButtonChangeBackgroundClickHandler();
  }

  async getUserLocation() {
    const location = await this.getData(this.model.geolocationAPIUrl);
    return location;
  }

  async getCityInfo(location) {
    const correctUrl = getCorrectUrl(this.opencagedataAPIUrl, this.language, location.loc);
    const cityInfo = await this.getData(correctUrl);
    return cityInfo;
  }

  async getWeatherData(url, location) {
    const locationValue = location.loc.split(',');
    const latitude = locationValue[0];
    const longitude = locationValue[1];
    const correctUrl = getCorrectUrl(url, this.language, latitude, longitude);
    const weatherData = await this.getData(correctUrl);
    return weatherData;
  }

  addButtonChangeBackgroundClickHandler() {
    this.btnChangeBackground.addEventListener('click', async (e) => {
      const linkToImage = await this.getData(this.model.imageBackgroundAPIUrl);
      if (linkToImage) {
        this.changeImage(linkToImage.urls.regular);
      }
    });
  }

  async getData(url) {
    try {
      //todo: add property for request
      const result = await fetch(url);
      const data = await result.json();
      return data;
    } catch (err) {
      console.log('*', this.model.errorMsg, err);
    }
    return null;
  }

  changeImage(url) {
    this.image.src = url;
    this.image.addEventListener('load', () => {
      document.body.append(this.image);
    });
  }
}

export default Controller;
