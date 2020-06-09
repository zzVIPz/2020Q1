import Swiper from 'swiper';
import KeyboardController from './keyboard-module/Controller';
import KeyboardModel from './keyboard-module/Model';
import KeyboardView from './keyboard-module/View';
import getCorrectUrl from './modules/getCorrectUrl';
import checkLetters from './modules/checkLetters';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.keyboard = null;
    this.input = document.querySelector('.movie__search');
    this.btnSearch = document.querySelector('.button__search');
    this.btnClear = document.querySelector('.button__clear');
    this.container = document.querySelector('.movie__cards-container');
    this.loader = document.querySelector('.loader-container');
    this.indicator = document.querySelector('.indicator-container');
    this.info = document.querySelector('.movie__info-block');
    this.keyboardShowButton = document.querySelector('.button__keyboard');
    this.swiper = null;
    this.translate = null;
    this.keyboardState = false;
    this.value = null;
    this.currentValue = null;
    this.index = 5;
    this.page = 1;
    this.totalResults = 20;
    this.loading = false;
    this.movieApiUrl = this.model.movieApiUrl;
    this.translateApiUrl = this.model.translateApiUrl;
  }

  init() {
    const defaultRequestValue = 'dream';
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
        dynamicMainBullets: 5,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    this.swiperButton = document.querySelector('.swiper-button-next');
    this.toggleLoaderDisplay(true);
    this.getRequestData(defaultRequestValue);
    this.currentValue = defaultRequestValue;
    this.previousTranslate = defaultRequestValue;
    this.translate = defaultRequestValue;
    this.addListeners();
  }

  addListeners() {
    this.addButtonEnterClickHandler();
    this.addButtonClearClickHandler();
    this.addButtonSearchClickHandler();
    this.addSlideChangeHandler();
    this.addButtonKeyboardClickHandler();
    document.addEventListener('mousedown', (event) => this.moveKeyboard(event));
    document.addEventListener('dragstart ', () => false);
    document.addEventListener('mouseleave', (event) => {
      this.leaveWindow(event);
    });
  }

  moveKeyboard(event) {
    if (event.target.closest('.keyboard__container')) {
      this.keyboard = document.querySelector('.keyboard__container');
      this.shiftX = event.clientX - this.keyboard.getBoundingClientRect().left;
      this.shiftY = event.clientY - this.keyboard.getBoundingClientRect().top;
      this.moveAt(event.pageX, event.pageY);
      this.bindedOnMouseMove = this.onMouseMove.bind(this);
      document.addEventListener('mousemove', this.bindedOnMouseMove);
      this.keyboard.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', this.bindedOnMouseMove);
        this.keyboard.style.bottom = 'auto';
      });
    }
  }

  moveAt(pageX, pageY) {
    this.keyboard.style.left = `${pageX - this.shiftX}px`;
    this.keyboard.style.top = `${pageY - this.shiftY}px`;
  }

  onMouseMove(event) {
    this.moveAt(event.pageX, event.pageY);
  }

  leaveWindow(event) {
    if (event.toElement == null && event.relatedTarget == null) {
      document.removeEventListener('mousemove', this.bindedOnMouseMove);
    }
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
      this.clearInput();
    });
  }

  addButtonSearchClickHandler() {
    const bntSearch = document.querySelector('.button__search');
    bntSearch.addEventListener('click', () => {
      this.checkValue();
    });
  }

  addButtonKeyboardClickHandler() {
    this.keyboardShowButton.addEventListener('click', () => {
      if (!this.keyboard) {
        this.initKeyboard();
      }
      this.keyboardState = !this.keyboardState;
      if (this.keyboardState) {
        this.keyboardContainer.classList.add('keyboard__container--active');
        this.keyboardShowButton.classList.add('button__keyboard--active');
      } else {
        this.keyboardContainer.classList.remove('keyboard__container--active');
        this.keyboardShowButton.classList.remove('button__keyboard--active');
      }
    });
  }

  initKeyboard() {
    this.keyboard = new KeyboardController(
      KeyboardModel,
      new KeyboardView(),
      this.checkValue.bind(this),
    );
    this.keyboard.init();
    this.keyboardContainer = document.querySelector('.keyboard__container');
  }

  async checkValue() {
    this.value = this.input.value;
    if (this.value && this.value !== this.currentValue) {
      this.previousTranslate = this.translate;
      this.translate = await this.checkLanguage(this.value);
      this.currentValue = this.value;
      this.toggleLoaderDisplay(true);
      this.getRequestData(this.translate);
    }
  }

  async getRequestData(value, page) {
    const data = await this.getData('s', value, page);
    this.checkResponseData(data);
  }

  checkResponseData(data) {
    if (data.Response === 'True') {
      if (this.translate !== this.previousTranslate) {
        this.setDefaultState();
      }
      this.showResponseMessage(data);
      this.getMovies(data);
    }
    if (data.Response === 'False') {
      this.toggleLoaderDisplay();
      this.toggleIndicatorDisplay();
      this.showResponseMessage(data);
    }
  }

  async getMovies(data) {
    const extendedData = await this.addMovieRating(data);
    this.page += 1;
    this.renderCard(extendedData);
  }

  async getData(mode, value, page) {
    const url = getCorrectUrl(this.movieApiUrl, mode, value, page);
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async checkLanguage(value) {
    if (checkLetters(value)) {
      const data = await this.translateRequest(value);
      return data[0];
    }
    return value;
  }

  async translateRequest(value) {
    const url = this.translateApiUrl.replace(/\{text\}/g, value);
    const result = await fetch(url);
    const data = await result.json();
    return data.text;
  }

  showResponseMessage(data) {
    if (data.Response === 'True' && this.currentValue) {
      let result = 'movies';
      this.totalResults = data.totalResults;
      if (data.totalResults === '1') {
        result = 'movie';
      }
      this.info.innerHTML = `We have ${data.totalResults} ${result} for request "${this.translate}"!`;
    }
    if (data.Response === 'False') {
      if (data.Error === 'Request limit reached!') {
        this.info.innerHTML = this.model.errorMessage;
      } else {
        this.info.innerHTML = `We regret it, but for your request "${
          this.translate
        }" ${data.Error.toLowerCase()} Please, try again!`;
        this.translate = this.previousTranslate;
      }
    }
  }

  async renderCard(data) {
    data.forEach((card) => {
      const templateCard = this.view.createCard(card, this.model.card, this.page);
      this.swiper.appendSlide(templateCard);
    });
    await this.addImagesLoaderHandler(this.page - 1);
  }

  addImagesLoaderHandler(imageID) {
    let counter = 0;
    const images = document.querySelectorAll(`.image-page${imageID}`);
    images.forEach((image) => image.addEventListener('load', () => {
      counter += 1;
      this.totalLoad += 1;
      if (counter === images.length) {
        this.toggleLoaderDisplay();
        this.toggleIndicatorDisplay();
        this.swiper.update();
      }
    }));
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
      this.container.classList.add('movie__cards-container--disabled');
    } else {
      this.loader.classList.add('loader--disabled');
      this.container.classList.remove('movie__cards-container--disabled');
    }
  }

  toggleIndicatorDisplay(mode) {
    if (mode) {
      this.indicator.classList.remove('indicator--disabled');
      this.swiperButton.classList.add('swiper-button-disabled');
    } else {
      this.indicator.classList.add('indicator--disabled');
      this.swiperButton.classList.remove('swiper-button-disabled');
    }
  }

  clearMoviesContainer() {
    this.swiper.removeAllSlides();
  }

  setDefaultState() {
    this.info.innerHTML = '';
    this.clearMoviesContainer();
    this.previousTranslate = this.translate;
    this.page = 1;
    this.index = 5;
    this.totalResults = 0;
  }

  clearInput() {
    this.input.value = '';
    this.currentValue = null;
  }

  addSlideChangeHandler() {
    this.swiper.on('slideChange', () => {
      const index = this.swiper.activeIndex;
      if (index + 5 >= this.index && index <= this.totalResults - 10) {
        this.index += 5;
        this.toggleIndicatorDisplay(true);
        this.getRequestData(this.translate, this.page);
      }
    });
  }
}

export default Controller;
