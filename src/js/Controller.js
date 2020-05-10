import Swiper from 'swiper';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.input = document.querySelector('.movie__search');
    this.btnSearch = document.querySelector('.button__search');
    this.btnClear = document.querySelector('.button__clear');
    this.container = document.querySelector('.movie__cards-container');
    this.loader = document.querySelector('.loader-container');
    this.indicator = document.querySelector('.indicator-container');
    this.info = document.querySelector('.movie__info-block');
    this.swiper = null;
    this.value = null;
    this.currentValue = null;
    this.value = null;
    this.state = true;
    this.index = 5;
    this.page = 1;
    this.totalResults = 0;
    this.loading = false;
    this.movieApiUrl = this.model.movieApiUrl;
    this.translateApiUrl = this.model.translateApiUrl;
  }

  init() {
    this.view.init(this.model.swiper, this.model.loader, this.model.indicator);
    this.swiper = new Swiper('.swiper-container', {
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 20,
        },
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 10,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    this.addListeners();
    this.toggleLoaderDisplay(true);
    this.getRequestData('dream', 1);
  }

  addListeners() {
    this.addButtonEnterClickHandler();
    this.addButtonClearClickHandler();
    this.addButtonSearchClickHandler();
    this.addSlideChangeHandler();
    this.addImagesLoaderHandler();
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
      this.setDefaultState(true);
    });
  }

  addButtonSearchClickHandler() {
    const bntSearch = document.querySelector('.button__search');
    bntSearch.addEventListener('click', () => {
      this.checkValue();
    });
  }

  addImagesLoaderHandler() {
    //TODO: add lazy load image
  }

  async checkValue() {
    const { value } = this.input;
    if (value && value !== this.currentValue) {
      this.currentValue = value;
      this.value = await this.checkLanguage(value);
      this.toggleLoaderDisplay(true);
      this.setDefaultState();
      this.getRequestData(this.value, this.page);
    }
  }

  async getRequestData(value, page) {
    const data = await this.getData('s', value, page);
    this.checkResponseData(data);
  }

  async getData(mode, value, page) {
    const url = this.getCorrectUrl(mode, value, page);
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async checkLanguage(value) {
    if (/[а-я]/i.test(value)) {
      const data = await this.translateRequest(value);
      return data;
    }
    return value;
  }

  async translateRequest(value) {
    const url = this.translateApiUrl.replace(/\{text\}/g, value);
    const result = await fetch(url);
    const data = await result.json();
    return data.text;
  }

  checkResponseData(data) {
    if (data.Response === 'True') {
      this.showResponseMessage(data);
      this.getMovies(data);
    }
    if (data.Response === 'False') {
      this.toggleLoaderDisplay();
      this.toggleIndicatorDisplay();
      this.showResponseMessage(data);
    }
  }

  showResponseMessage(data) {
    if (data.Response === 'True' && this.currentValue) {
      this.state = false;
      let result = 'movies';
      this.totalResults = data.totalResults;
      if (data.totalResults === '1') {
        result = 'movie';
      }
      this.info.innerHTML = `We have ${data.totalResults} ${result} for your request "${this.value}"!`;
    }
    if (data.Response === 'False' && this.state) {
      if (data.Error === 'Request limit reached!') {
        this.info.innerHTML = this.model.errorMessage;
      } else {
        this.info.innerHTML = `We regret it, but for your request "${
          this.currentValue
        }" ${data.Error.toLowerCase()} Please, try again!`;
      }
    }
  }

  async getMovies(data) {
    const extendedData = await this.addMovieRating(data);
    this.setRequestPageNumber();
    this.toggleLoaderDisplay();
    this.toggleIndicatorDisplay();
    this.renderCard(extendedData);
  }

  renderCard(data) {
    data.forEach((card) => {
      const templateCard = this.view.createCard(card, this.model.card);
      this.swiper.appendSlide(templateCard);
    });
    this.swiper.update();
    if (this.page === 2) {
      this.swiper.slideToLoop(0);
    }
  }

  setRequestPageNumber(key) {
    if (key) {
      this.page = 1;
    } else {
      this.page += 1;
    }
  }

  getCorrectUrl(mode, value, page) {
    let url = this.movieApiUrl.replace(/\{type\}/g, mode);
    if (page) {
      url = url.replace(/\{page\}/g, `page=${page}&`);
    } else {
      url = url.replace(/\{page\}/g, '');
    }
    if (value) {
      url = url.replace(/\{key\}/g, value);
    }
    return url;
  }

  addMovieRating(data) {
    const extendedData = Promise.all(
      data.Search.map(async (item) => {
        const movie = item;
        const movieDescription = await this.getData('i', movie.imdbID);
        movie.Rating = movieDescription.imdbRating;
        return movie;
      }),
    );
    return extendedData;
  }

  toggleLoaderDisplay(mode) {
    if (mode) {
      this.loader.classList.remove('loader--disabled');
    } else {
      this.loader.classList.add('loader--disabled');
    }
  }

  toggleIndicatorDisplay(mode) {
    if (mode) {
      this.indicator.classList.remove('indicator--disabled');
    } else {
      this.indicator.classList.add('indicator--disabled');
    }
  }

  clearMoviesContainer() {
    this.swiper.removeAllSlides();
  }

  setDefaultState(mode) {
    if (mode) {
      this.input.value = '';
      this.currentValue = null;
    }
    this.state = true;
    this.info.innerHTML = '';
    this.clearMoviesContainer();
    this.page = 1;
    this.index = 5;
    this.totalResults = 0;
  }

  addSlideChangeHandler() {
    this.swiper.on('slideChange', () => {
      const index = this.swiper.activeIndex;
      if (index + 5 >= this.index && index <= this.totalResults - 10) {
        this.index += 5;
        this.toggleIndicatorDisplay(true);
        this.getRequestData(this.currentValue, this.page);
      }
    });
  }
}

export default Controller;
