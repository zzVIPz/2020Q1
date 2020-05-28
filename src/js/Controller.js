import Unsplash from 'unsplash-js';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.imageBackgroundAPIUrl = this.model.imageBackgroundAPIUrl;
    this.btnChangeBackground = document.querySelector('.button-change-background');
    this.image = document.querySelector('.background');
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    this.addButtonChangeBackgroundClickHandler();
  }

  addButtonChangeBackgroundClickHandler() {
    this.btnChangeBackground.addEventListener('click', async (e) => {
      const linkToImage = await this.getLinkToImage();
      if (linkToImage) {
        this.changeImage(linkToImage);
      }
    });
  }

  async getLinkToImage() {
    try {
      const url = this.imageBackgroundAPIUrl;
      const result = await fetch(url);
      const data = await result.json();
      return data.urls.regular;
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
