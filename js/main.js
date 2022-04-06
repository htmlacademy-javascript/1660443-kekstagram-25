import './api.js';
import {createGalleryElement, createGallery} from './data.js';
import {getData} from './api.js';
import './form.js';
import './photo-effects.js';

let uploadedPhotos;

getData((pictures) => {
  createGalleryElement(pictures);
  createGallery(pictures);
  uploadedPhotos = pictures;
});

export {uploadedPhotos};

