import {createStartGallery} from './data.js';
import {getData} from './api.js';
import './form.js';
import './photo-effects.js';
import './user-photo.js';

let uploadedPhotos;

getData((pictures) => {
  createStartGallery(pictures);
  uploadedPhotos = pictures;
});

export {uploadedPhotos};

