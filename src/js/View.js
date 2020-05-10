class View {
  constructor() {
    this.movieContainer = document.querySelector('.movie__cards-container');
    this.loaderContainer = document.querySelector('.loader-container');
    this.properties = ['Title', 'Poster', 'Year', 'Rating', 'imdbID'];
    this.swiper = null;
    this.loader = null;
  }

  init(swiper, loader) {
    this.loaderContainer.innerHTML = loader;
    this.movieContainer.innerHTML = swiper;
    this.loader = document.querySelector('.loader');
  }

  createCard(card, template) {
    const cardTemplate = this.getCorrectCardTemplate(card, template);
    return cardTemplate;
  }

  getCorrectCardTemplate(data, template) {
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
