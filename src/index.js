import Model from './js/Model';
import View from './js/View';
import Controller from './js/Controller';

window.onload = () => {
  const app = new Controller(Model, new View());
  app.init();
};
