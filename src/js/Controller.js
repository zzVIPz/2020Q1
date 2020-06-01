//todo: координаты населённого пункта: долгота и широта (в градусах и минутах)

import getCorrectUrl from './modules/getCorrectUrl';
import convertTemperature from './modules/convertTemperature';

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
    this.buttonSearch = document.querySelector('.button__search');
    this.buttonClear = document.querySelector('.button__clear');
    this.location = null;
    this.language = 'en';
    this.temperature = 'c';
    this.map = false;
    this.geolocationAPIUrl = this.model.geolocationAPIUrl;
    this.opencagedataAPIUrl = this.model.opencagedataAPIUrl;
    this.dailyForecastAPIUrl = this.model.dailyForecastAPIUrl;
    this.threeDayForecastAPIUrl = this.model.threeDayForecastAPIUrl;
  }

  async init() {
    this.language = localStorage.language || this.language;
    this.temperature = localStorage.temperature || this.temperature;
    this.selectLanguage.value = this.language;
    const location = await this.getUserLocation();
    if (location) {
      this.location = location.loc;
      this.getWeatherInformation(this.location);
    }
    this.addListeners();
  }

  async getWeatherInformation(location) {
    const cityInfo = await this.getCityInfo(location);
    const dailyForecast = await this.getWeatherData(this.dailyForecastAPIUrl, location);
    const threeDayForecast = await this.getWeatherData(this.threeDayForecastAPIUrl, location);
    console.log('cityInfo', cityInfo);
    console.log('dailyForecast', dailyForecast);
    console.log('threeDayForecast', threeDayForecast);
    this.renderTemplate(cityInfo, dailyForecast, threeDayForecast, location);
    this.setSetInterval(threeDayForecast.timezone);
    // this.changeBackgroundImage();
  }

  renderTemplate(cityInfo, dailyForecast, threeDayForecast, location) {
    this.view.locationInfoRender(cityInfo, this.language);
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

  setSetInterval(timezone) {
    this.view.dateRender(this.language, timezone);
    this.timer = setInterval(() => {
      this.view.dateRender(this.language, timezone);
    }, 1000);
  }

  addListeners() {
    this.addButtonChangeBackgroundClickHandler();
    this.selectLanguageClickHandler();
    this.toggleClickHandler();
    this.addButtonSearchClickHandler();
    this.addButtonClearClickHandler();
    this.addButtonEnterClickHandler();
  }

  async getUserLocation() {
    const location = await this.fetchAsync(this.geolocationAPIUrl);
    return location;
  }

  async getCityInfo(location) {
    const correctUrl = getCorrectUrl(this.opencagedataAPIUrl, this.language, location);
    const cityInfo = await this.fetchAsync(correctUrl);
    return cityInfo;
  }

  async getWeatherData(url, location) {
    const locationValue = location.split(',');
    const [latitude, longitude] = locationValue;
    const correctUrl = getCorrectUrl(url, this.language, latitude, longitude);
    const weatherData = await this.fetchAsync(correctUrl);
    return weatherData;
  }

  addButtonChangeBackgroundClickHandler() {
    this.btnChangeBackground.addEventListener('click', () => {
      this.changeBackgroundImage();
    });
  }

  addButtonSearchClickHandler() {
    this.buttonSearch.addEventListener('click', () => {
      this.getData();
    });
  }

  addButtonEnterClickHandler() {
    document.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        this.getData();
      }
    });
  }

  async getData() {
    if (this.search.value) {
      const cityInfo = await this.getCityInfo(this.search.value);
      if (cityInfo.results.length) {
        this.clearTimer();
        const coordinates = cityInfo.results[0].geometry;
        this.location = `${coordinates.lat},${coordinates.lng}`;
        this.getWeatherInformation(this.location);
      } else {
        //todo: show modal
        console.log('Нет такого города!!!');
      }
    }
  }

  addButtonClearClickHandler() {
    this.buttonClear.addEventListener('click', () => {
      this.search.value = '';
      this.search.focus();
    });
  }

  async changeBackgroundImage() {
    const keywords = document.querySelector('.weather__date').dataset.time;
    const formattedImageUrl = this.model.imageBackgroundAPIUrl.replace(/\{keywords\}/g, keywords);
    const linkToImage = await this.fetchAsync(formattedImageUrl);
    this.btnChangeBackground.classList.add('button-change-background--load');
    this.btnChangeBackground.disabled = true;
    if (linkToImage && linkToImage.urls) {
      this.setImage(linkToImage.urls.small);
    } else {
      this.setButtonChangeBackgroundDefaultState();
    }
  }

  selectLanguageClickHandler() {
    this.selectLanguage.addEventListener('click', () => {
      if (this.selectLanguage.value !== this.language) {
        this.clearTimer();
        this.language = this.selectLanguage.value;
        localStorage.language = this.language;
        this.getWeatherInformation(this.location);
      }
    });
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
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

  async fetchAsync(url) {
    try {
      //todo: add property for request
      const result = await fetch(url);
      const data = await result.json();
      if (result.status === 401) throw new Error(data.errors[0]);
      return data;
    } catch (err) {
      //todo: add show message error
      console.log('*!!!!!!!!!!!!', this.model.errorMsg, err);
    }
    return null;
  }

  setImage(url) {
    this.image.src = url;
    this.image.addEventListener('load', () => {
      document.body.append(this.image);
      this.setButtonChangeBackgroundDefaultState();
    });
  }

  setButtonChangeBackgroundDefaultState() {
    this.btnChangeBackground.classList.remove('button-change-background--load');
    this.btnChangeBackground.disabled = false;
  }
}

export default Controller;
