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
  }

  async init() {
    this.language = localStorage.language || this.language;
    this.temperature = localStorage.temperature || this.temperature;
    this.addListeners();
    const location = await this.getUserLocation();
    const weatherData = await this.getWeatherData(location);
    this.renderTemplate(weatherData);
  }

  renderTemplate(weatherData) {
    this.view.dateRender();
    this.view.locationInfoRender(weatherData);
  }

  addListeners() {
    this.addButtonChangeBackgroundClickHandler();
  }

  async getUserLocation() {
    const location = await this.getData(this.model.geolocationAPIUrl);
    return location;
  }

  async getWeatherData(location) {
    const correctUrl = getCorrectUrl(this.opencagedataAPIUrl, location.loc, this.language);
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
      console.log(this.model.errorMsg, err);
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
