import './api.js';
<<<<<<< HEAD
import {createGalleryElement, createDefaultGallery} from './data.js';
import {getData} from './api.js';
import './form.js';
import './photo-effects.js';
const RERENDER_DELAY = 500;
//import {showRandomPictures, picturesShown, showDefaultPictures} from './data.js';
//import {addThumbnailClickHandler} from './fullscreen.js';

getData((pictures) => {
  //createGallery(pictqqq
  ures);
  createDefaultGallery();
  const debounce = (callback, timeoutDelay) => {
    let timeoutId;
    return (...rest) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    };}

  createDefaultGallery(debounce(()=>createGalleryElement(pictures), RERENDER_DELAY ))



})
=======
import {createGallery, createGalleryElement} from './data.js';
import {getData} from './api.js';
import './form.js';
import './photo-effects.js';
import {buttons} from './filter.js';
const RERENDER_DELAY = 5000;

getData((pictures) => {
  createGallery(pictures);
})


>>>>>>> 5e0b874 (Перламутровые пуговицы)

