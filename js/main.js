import './api.js';
import {createGallery} from './data.js';
import {getData} from './api.js';
import './form.js';
import './photo-effects.js';

getData((pictures) => {
  createGallery(pictures);
});



