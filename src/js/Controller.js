class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.input = document.querySelector('.movie__search');
    this.btnSearch = document.querySelector('.button__search');
    this.btnClear = document.querySelector('.button__clear');
    this.container = document.querySelector('.movie__cards-container');
    this.value = null;
    this.previousValue = null;
    this.defaultUrl = 'http://www.omdbapi.com/?{type}={key}&apikey=3affc28d';
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    this.addButtonEnterClickHandler();
    this.addButtonClearClickHandler();
    this.addButtonSearchClickHandler();
  }

  addButtonEnterClickHandler() {
    document.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        this.checkValue();
      }
    });
  }

  addButtonClearClickHandler() {
    const bntClear = document.querySelector('.button__clear');
    bntClear.addEventListener('click', () => {
      this.input.value = '';
    });
  }

  addButtonSearchClickHandler() {
    const bntSearch = document.querySelector('.button__search');
    bntSearch.addEventListener('click', () => {
      this.checkValue();
    });
  }

  checkValue() {
    const { value } = this.input;
    console.log('*', value, typeof value);
    if (value && value !== this.previousValue) {
      this.previousValue = value;
      this.getRequestData(value);
    }
  }

  async getRequestData(value) {
    const data = await this.getData('s', value);
    const response = this.checkResponseData(data);
  }

  checkResponseData(data) {
    if (data.Response === 'True') {
      this.getMovies(data);
    }
    if (data.Response === 'False') {
      //TODO: add div box with message
      this.clearMoviesContainer();
      console.log('Mistake');
    }
  }

  async getMovies(data) {
    const extentedData = await this.addMovieRating(data);
    console.log('extentedData', extentedData);
    this.renderCard(extentedData);
  }

  async getData(mode, value) {
    const url = this.getCorrectUrl(mode, value);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  }

  getCorrectUrl(mode, value) {
    let url = this.defaultUrl.replace(/\{type\}/g, mode);
    if (value) {
      url = url.replace(/\{key\}/g, value);
    }
    return url;
  }

  addMovieRating(data) {
    const extentedData = Promise.all(
      data.Search.map(async (item) => {
        const movie = item;
        const movieDescription = await this.getData('i', movie.imdbID);
        movie.Rating = movieDescription.imdbRating;
        return movie;
      }),
    );
    return extentedData;
  }

  renderCard(data) {
    this.clearMoviesContainer();
    data.forEach((card) => {
      const templateCard = this.view.createCard(card, this.model.card);
      this.container.innerHTML += templateCard;
    });
  }

  clearMoviesContainer() {
    this.container.innerHTML = '';
  }
}

export default Controller;
