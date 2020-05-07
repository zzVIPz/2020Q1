class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.input = document.querySelector('.movie__search');
    this.btnSearch = document.querySelector('.button__search');
    this.btnClear = document.querySelector('.button__clear');
    this.value = null;
    this.request = 'http://www.omdbapi.com/?i={key}&apikey=3affc28d';
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
        this.getRequestValue();
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
    bntSearch.addEventListener('click', (e) => {
      this.getRequestValue();
    });
  }

  async getRequestValue() {
    const { value } = this.input;
    const url = `https://www.omdbapi.com/?s=dream&apikey=3affc28d`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  }
}

export default Controller;
