import './api.js';
import {createGalleryElement, createDefaultGallery, createGallery} from './data.js';
import {getData} from './api.js';
import './form.js';
import './photo-effects.js';
import {addThumbnailClickHandler} from './fullscreen.js';


const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
getData((pictures) => {
  createGalleryElement(pictures);
  createGallery(pictures)
  createDefaultGallery(pictures)


  //createDefaultGallery(debounce(
  //() => createGalleryElement(pictures),
  // 500,
  //));
})


