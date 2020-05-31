//todo: координаты населённого пункта: долгота и широта (в градусах и минутах)

import getCorrectUrl from './modules/getCorrectUrl';
import convertTemperature from './modules/convertTemperature';
import getImageUrl from './modules/getImageUrl';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.btnChangeBackground = document.querySelector('.button-change-background');
    this.selectLanguage = document.querySelector('#language');
    this.image = document.querySelector('.background');
    this.switch = document.querySelector('.can-toggle__switch');
    this.toggle = document.querySelector('#toggle');
    this.search = document.querySelector('.search');
    this.language = 'en';
    this.temperature = 'c';
    this.map = false;
    this.opencagedataAPIUrl = this.model.opencagedataAPIUrl;
    this.dailyForecastAPIUrl = this.model.dailyForecastAPIUrl;
    this.threeDayForecastAPIUrl = this.model.threeDayForecastAPIUrl;
  }

  async init() {
    this.language = localStorage.language || this.language;
    this.temperature = localStorage.temperature || this.temperature;
    this.selectLanguage.value = this.language;
    const location = await this.getUserLocation();
    const cityInfo = await this.getCityInfo(location);
    const dailyForecast = await this.getWeatherData(this.dailyForecastAPIUrl, location);
    const threeDayForecast = await this.getWeatherData(this.threeDayForecastAPIUrl, location);
    this.renderTemplate(cityInfo, dailyForecast, threeDayForecast, location.loc);
    this.setSetInterval();
    this.changeBackgroundImage();
    this.addListeners();
  }

  renderTemplate(cityInfo, dailyForecast, threeDayForecast, location) {
    this.view.locationInfoRender(cityInfo);
    this.view.dailyForecastRender(
      this.model.weatherImageTemplate,
      this.model.weatherDescription[this.language],
      dailyForecast,
    );
    this.view.threeDayForecastRender(
      this.model.threeDayForecastTemplate,
      threeDayForecast,
      this.language,
    );
    if (this.temperature === 'f') {
      this.toggle.checked = true;
      this.callConvertTemperature();
    }
    if (!this.map) {
      this.view.renderMap(location);
      this.map = true;
    }
  }

  setSetInterval() {
    this.view.dateRender(this.language);
    this.timer = setInterval(() => {
      this.view.dateRender(this.language);
    }, 1000);
  }

  addListeners() {
    this.addButtonChangeBackgroundClickHandler();
    this.selectLanguageClickHandler();
    this.toggleClickHandler();
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
    this.btnChangeBackground.addEventListener('click', () => {
      this.changeBackgroundImage();
    });
  }

  async changeBackgroundImage() {
    const keywords = document.querySelector('.weather__date').dataset.time;
    const formattedImageUrl = this.model.imageBackgroundAPIUrl.replace(/\{keywords\}/g, keywords);

    console.log('string', formattedImageUrl, keywords);
    const linkToImage = await this.getData(formattedImageUrl);
    this.btnChangeBackground.classList.add('button-change-background--load');
    this.btnChangeBackground.disabled = true;
    if (linkToImage) {
      this.setImage(linkToImage.urls.small);
    }
  }

  selectLanguageClickHandler() {
    this.selectLanguage.addEventListener('click', () => {
      if (this.selectLanguage.value !== this.language) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.language = this.selectLanguage.value;
        localStorage.language = this.language;
        this.init();
      }
    });
  }

  toggleClickHandler() {
    this.switch.addEventListener('click', () => {
      this.temperature = this.temperature === 'c' ? 'f' : 'c';
      localStorage.temperature = this.temperature;
      this.callConvertTemperature();
    });
  }

  callConvertTemperature() {
    const temperatureNodes = document.querySelectorAll('.temp-value');
    convertTemperature(this.temperature, temperatureNodes);
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

  setImage(url) {
    this.image.src = url;
    this.image.addEventListener('load', () => {
      document.body.append(this.image);
      this.btnChangeBackground.classList.remove('button-change-background--load');
      this.btnChangeBackground.disabled = false;
    });
  }
}

export default Controller;
