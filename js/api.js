import {createGallery} from './data.js';

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => {
    createGallery(pictures);
  });


