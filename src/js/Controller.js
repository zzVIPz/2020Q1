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
    this.swiper = null;
    this.value = null;
    this.currentValue = null;
    this.index = 5;
    this.page = 1;
    this.defaultUrl = 'http://www.omdbapi.com/?{type}={key}&{page}apikey=3affc28d';
  }

  init() {
    this.view.init(this.model.swiper, this.model.loader, this.model.indicator);
    this.swiper = new Swiper('.swiper-container', {
      // loop: true,
      // loopFillGroupWithBlank: true,
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        // when window width is >= 480px
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 30,
        },
        // when window width is >= 640px
        960: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 40,
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
    console.log('swiper', this.swiper);
    this.addListeners();
    this.toggleLoaderDisplay(true);
    this.getRequestData('dream', 1);
  }

  addListeners() {
    this.addButtonEnterClickHandler();
    this.addButtonClearClickHandler();
    this.addButtonSearchClickHandler();
    this.addSlideChangeHandler();
    this.addLoaderHandler();
  }

  addLoaderHandler() {
    document.addEventListener('load', () => {
      console.log('loader');
    });
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

  checkValue() {
    const { value } = this.input;
    console.log('*', value, this.currentValue);
    if (value && value !== this.currentValue) {
      this.currentValue = value;
      console.log('curValue', this.currentValue);
      this.toggleLoaderDisplay(true);
      this.setDefaultState();
      this.getRequestData(value, this.page);
    }
  }

  async getRequestData(value, page) {
    const data = await this.getData('s', value, page);
    const response = this.checkResponseData(data);
  }

  async getData(mode, value, page) {
    const url = this.getCorrectUrl(mode, value, page);
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  checkResponseData(data) {
    if (data.Response === 'True') {
      this.getMovies(data);
    }
    if (data.Response === 'False') {
      this.toggleIndicatorDisplay();
      //TODO: add div box with message
      console.log('Mistake', data);
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
    // this.toggleLoaderDisplay();
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
    let url = this.defaultUrl.replace(/\{type\}/g, mode);
    if (page) {
      url = url.replace(/\{page\}/g, `page=${page}&`);
    } else {
      url = url.replace(/\{page\}/g, '');
    }
    if (value) {
      url = url.replace(/\{key\}/g, value);
    }
    console.log('url', url);
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
    this.clearMoviesContainer();
    this.page = 1;
    this.index = 5;
  }

  addSlideChangeHandler() {
    this.swiper.on('slideChange', () => {
      const index = this.swiper.activeIndex;
      if (index + 5 >= this.index) {
        this.index += 5;
        this.toggleIndicatorDisplay(true);
        this.getRequestData(this.currentValue, this.page);
      }
    });
  }
}

export default Controller;
