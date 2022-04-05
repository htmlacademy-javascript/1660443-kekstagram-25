import './api.js';
import {createGallery} from './data.js';
import {getData} from './api.js';
import './form.js';
import './photo-effects.js';
import {defaultButton, removeClass, removeElement} from './filter.js';
const RERENDER_DELAY = 5000;

getData((pictures) => {
  //createGallery(pictures);

  defaultButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeElement();
    removeClass();
    defaultButton.classList.add('img-filters__button--active');
    createGallery(pictures);
  });

  const debounce = (callback, timeoutDelay) => {
    let timeoutId;
    return (...rest) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    };
  };

  //Не поняла debouce совсем(
  //Это правильно?
  debounce((createGallery(pictures), RERENDER_DELAY));
});

