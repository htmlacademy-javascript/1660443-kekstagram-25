import {onThumbnailClick} from './fullscreen.js';
import {standardButtonElement, popularButtonElement, randomButtonElement, clearPicturesList} from './filter.js';
import {uploadedPhotos} from './main.js';
import {getRandomArrayElement, debounce} from './util.js';
const MAX_RANDOM_PHOTOS = 10;
const RERENDERED_DELAY = 500;

const photoFragment = document.createDocumentFragment();
const photoContainerElement = document.querySelector ('.pictures');
const photoTemplateFragment = document.querySelector('#picture').content;
const photoTemplateElement = photoTemplateFragment.querySelector('.picture');

const createGalleryElement = (pictures) => {
  pictures.forEach((photo) => {
    const photoElement =  photoTemplateElement.cloneNode(true);
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__img').src = photo.url;
    photoFragment.appendChild(photoElement);
    photoContainerElement.appendChild(photoFragment);
    photoContainerElement.appendChild(photoElement);
  });
};

const openPreview = (array1, array2) => {
  for (let i = 0; i < array1.length; i++) {
    onThumbnailClick(array1[i], array2[i]);
  }};

const createGallery = (gallery) => {
  createGalleryElement(gallery);
  const thumbnails = document.querySelectorAll('.picture');
  openPreview(thumbnails, gallery);
};

const createStartGallery = (pictures) => {
  createGallery(pictures);
};

const onCreateStandardGallery = () => {
  clearPicturesList();
  const standardPictures = uploadedPhotos.slice();
  standardButtonElement.classList.add('img-filters__button--active');
  createGallery(standardPictures);
};

const onCreatePopularGallery = () => {
  clearPicturesList();
  popularButtonElement.classList.add('img-filters__button--active');
  const copiedPictures = uploadedPhotos.slice();
  const sortedPictures = copiedPictures.sort((a , b) => b.comments.length - a.comments.length);
  createGallery(sortedPictures);
};

const onCreateRandomGallery = () => {
  clearPicturesList();
  randomButtonElement.classList.add('img-filters__button--active');
  const copiedPictures = uploadedPhotos.slice();
  let uniqueRandomPictures = [];
  const randomPictures = copiedPictures.map(()=> getRandomArrayElement(copiedPictures));

  if (uniqueRandomPictures < MAX_RANDOM_PHOTOS ) {
    uniqueRandomPictures = new Set(randomPictures);
  }

  const shownPictures = Array.from(uniqueRandomPictures).slice(0, MAX_RANDOM_PHOTOS);
  createGallery(shownPictures);
};

const addFilters = () => {
  standardButtonElement.addEventListener('click', debounce(onCreateStandardGallery, RERENDERED_DELAY,
  ));
  popularButtonElement.addEventListener('click', debounce(onCreatePopularGallery, RERENDERED_DELAY
  ));
  randomButtonElement.addEventListener('click', debounce(onCreateRandomGallery, RERENDERED_DELAY
  ));
};

addFilters();

export {createStartGallery, createGalleryElement};
