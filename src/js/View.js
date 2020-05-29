import data from './Model';

class View {
  constructor(model, view) {
    this.weatherCity = document.querySelector('.weather__city');
    this.weatherCountry = document.querySelector('.weather__country');
    this.weatherDate = document.querySelector('.weather__date');
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

  locationInfoRender(weatherData) {
    console.log(weatherData);
    this.weatherCity.innerText = weatherData.results[0].components.city;
    this.weatherCountry.innerText = weatherData.results[0].components.country;
  }
}

export default View;
