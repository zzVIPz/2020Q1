/* global SpeechRecognition */
/* eslint-disable no-undef */

import getCorrectUrl from './modules/getCorrectUrl';
import convertTemperature from './modules/convertTemperature';
import getMessage from './modules/getMessage';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.geolocationAPIUrl = this.model.geolocationAPIUrl;
    this.opencagedataAPIUrl = this.model.opencagedataAPIUrl;
    this.dailyForecastAPIUrl = this.model.dailyForecastAPIUrl;
    this.threeDayForecastAPIUrl = this.model.threeDayForecastAPIUrl;
    this.btnChangeBackground = document.querySelector('.button-change-background');
    this.selectLanguage = document.querySelector('#language');
    this.image = document.querySelector('.background');
    this.switch = document.querySelector('.can-toggle__switch');
    this.toggle = document.querySelector('#toggle');
    this.search = document.querySelector('.search');
    this.controlTool = document.querySelector('.control');
    this.searchTool = document.querySelector('.search-tool');
    this.buttonSearch = document.querySelector('.button__search');
    this.buttonClear = document.querySelector('.button__clear');
    this.buttonSpeaker = document.querySelector('.button-speaker');
    this.loader = document.querySelector('.loader-container');
    this.weatherContainer = document.querySelector('.weather__container');
    this.microphone = document.querySelector('.button__microphone');
    this.location = null;
    this.microphoneState = false;
    this.speakerState = false;
    this.language = 'en';
    this.temperature = 'c';
  }

  async init() {
    this.language = localStorage.language || this.language;
    this.temperature = localStorage.temperature || this.temperature;
    this.selectLanguage.value = this.language;
    this.view.init(this.model.loader);
    const location = await this.getUserLocation();
    if (location) {
      this.location = location.loc;
      this.getWeatherInformation(this.location);
    }
    this.addListeners();
  }

  async getWeatherInformation(location) {
    this.microphoneState = false;
    const cityInfo = await this.getCityInfo(location);
    const dailyForecast = await this.getWeatherData(this.dailyForecastAPIUrl, location);
    const threeDayForecast = await this.getWeatherData(this.threeDayForecastAPIUrl, location);
    console.log('cityInfo', cityInfo);
    console.log('dailyForecast', dailyForecast);
    console.log('threeDayForecast', threeDayForecast);
    this.renderTemplate(cityInfo, dailyForecast, threeDayForecast, location);
    this.setSetInterval(threeDayForecast.timezone);
    // await this.changeBackgroundImage();
    this.toggleLoaderDisplay(false);
    this.view.renderMap(location);
  }

  toggleLoaderDisplay(mode) {
    if (mode) {
      this.loader.classList.remove('loader--disabled');
      this.weatherContainer.classList.add('weather__container--disabled');
      this.searchTool.classList.remove('search-tool--active');
      this.controlTool.classList.remove('control--active');
    } else {
      this.loader.classList.add('loader--disabled');
      this.weatherContainer.classList.remove('weather__container--disabled');
      this.searchTool.classList.add('search-tool--active');
      this.controlTool.classList.add('control--active');
    }
  }

  renderTemplate(cityInfo, dailyForecast, threeDayForecast) {
    this.view.setPlaceholderValue(this.language);
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
    this.addButtonMicrophoneClickHandler();
    this.addButtonSpeakerClickHandler();
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

  addButtonMicrophoneClickHandler() {
    this.microphone.addEventListener('click', () => {
      this.microphoneState = !this.microphoneState;
      if (this.microphoneState) {
        this.microphone.classList.add('button__microphone--active');
        this.recordSpeech();
      } else {
        this.recognition.abort();
        this.microphone.classList.remove('button__microphone--active');
      }
    });
  }

  addButtonSpeakerClickHandler() {
    this.buttonSpeaker.addEventListener('click', () => {
      this.buttonSpeaker.classList.toggle('button-speaker--active');
      this.speakerState = !this.speakerState;
      if (this.speakerState) {
        this.listenToWetherForecast();
      } else {
        speechSynthesis.cancel();
        this.speakerState = !this.speakerState;
      }
    });
  }

  listenToWetherForecast() {
    const message = new SpeechSynthesisUtterance();
    message.lang = this.language;
    message.addEventListener('end', () => {
      this.speakerState = !this.speakerState;
      this.buttonSpeaker.classList.remove('button-speaker--active');
    });
    message.text = getMessage(
      this.language,
      document.querySelector('.weather__city').innerText,
      document.querySelector('.weather__country').innerText,
      document.querySelector('.temp-value').innerText,
      document.querySelector('.weather__description').innerText,
      document.querySelector('.weather__apparent_temp').innerText,
      document.querySelector('.weather__wind_speed').innerText,
      document.querySelector('.weather__relative_humidity').innerText,
    );
    speechSynthesis.speak(message);
  }

  recordSpeech() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.search.value = '';
    let requestCounter = 0;
    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = this.language;
    this.recognition.addEventListener('result', (e) => {
      const transcription = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.search.value = transcription;
      if (!requestCounter) {
        requestCounter += 1;
        setTimeout(() => {
          this.microphone.classList.remove('button__microphone--active');
          this.getData();
        }, 2000);
      }
    });

    this.recognition.addEventListener('end', () => {
      console.log('listener---end');
      this.microphoneState = false;
      this.microphone.classList.remove('button__microphone--active');
    });
    this.recognition.start();
  }

  async getData() {
    if (this.search.value) {
      const cityInfo = await this.getCityInfo(this.search.value);
      if (cityInfo.results.length) {
        this.toggleLoaderDisplay(true);
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
    console.log('**********');
    console.log('You can see the image request information below');
    console.log('**********');
    console.log(formattedImageUrl);
    console.log('**********');
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
        speechSynthesis.cancel();
        this.getWeatherInformation(this.location);
        this.toggleLoaderDisplay(true);
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
