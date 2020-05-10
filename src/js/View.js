class View {
  constructor() {
    this.movieContainer = document.querySelector('.movie__cards-container');
    this.loaderContainer = document.querySelector('.loader-container');
    this.indicatorContainer = document.querySelector('.indicator-container');
    this.properties = ['Title', 'Poster', 'Year', 'Rating', 'imdbID'];
    this.swiper = null;
  }

  init(swiper, loader, indicator) {
    this.loaderContainer.innerHTML = loader;
    this.movieContainer.innerHTML = swiper;
    this.indicatorContainer.innerHTML = indicator;
  }

  createCard(card, template) {
    const cardTemplate = this.getCorrectCardTemplate(card, template);
    return cardTemplate;
  }

  getCorrectCardTemplate(card, template) {
    const data = card;
    let cardTemplate = template;
    this.properties.forEach((property) => {
      if (data[property] === 'N/A' && property === 'Poster') {
        data[property] = './src/assets/images/no_poster_available.png';
      }
      cardTemplate = cardTemplate.replace(`{${property}}`, data[property]);
    });
    return cardTemplate;
  }
}

export default View;
