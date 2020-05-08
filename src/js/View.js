class View {
  constructor() {
    this.properties = ['Title', 'Poster', 'Year', 'Rating'];
  }
  init() {}

  createCard(card, template) {
    const cardTemplate = this.getCorrectCardTemplate(card, template);
    return cardTemplate;
  }

  getCorrectCardTemplate(data, template) {
    let cardTemplate = template;
    this.properties.forEach((property) => {
      cardTemplate = cardTemplate.replace(`{${property}}`, data[property]);
    });
    cardTemplate = cardTemplate.replace(/N\/A/g, './src/assets/images/no_poster_available.png');
    return cardTemplate;
  }
}

export default View;
