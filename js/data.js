import {addThumbnailClickHandler} from './fullscreen.js';
import {defaultButton, popularButton, randomButton, clearPreviousPictures} from './filter.js';
import {uploadedPhotos} from './main.js';
import {getRandomArrayElement, debounce} from './util.js';

const galleryFragment = document.createDocumentFragment();
const photoContainer = document.querySelector ('.pictures');
const photoTemplateFragment = document.querySelector('#picture').content;
const photoTemplate = photoTemplateFragment.querySelector('.picture');
const MAX_RANDOM_PHOTOS = 10;
const RERENDERED_DELAY = 500;

const createGalleryElement = (pictures) => {
  pictures.forEach((photo) => {
    const pictureElement =  photoTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__img').src = photo.url;
    galleryFragment.appendChild(pictureElement);
    photoContainer.appendChild(galleryFragment);
  });};

const openPreview = (array1, array2) => {
  for (let i = 0; i < array1.length; i++) {
    addThumbnailClickHandler(array1[i], array2[i]);
  }};


const createGallery = (pictures) => {
  createGalleryElement(pictures);
  const thumbnails = document.querySelectorAll('.picture');
  openPreview(thumbnails, pictures);
};

const createDefaultGallery = () => {
  clearPreviousPictures();
  const picturesDefault = uploadedPhotos.slice();
  defaultButton.classList.add('img-filters__button--active');
  createGalleryElement(picturesDefault);
  const thumbnailsDefault = document.querySelectorAll('.picture');
  openPreview(thumbnailsDefault, picturesDefault);
};


const createPopularGallery = () => {
  clearPreviousPictures();
  popularButton.classList.add('img-filters__button--active');
  const picturesCopy = uploadedPhotos.slice();
  const picturesSorted = picturesCopy.sort((a , b) => b.comments.length - a.comments.length);
  createGalleryElement(picturesSorted);
  const thumbnailsSorted = document.querySelectorAll('.picture');
  openPreview(thumbnailsSorted, picturesSorted);
};


const createRandomGallery = () => {
  clearPreviousPictures();
  randomButton.classList.add('img-filters__button--active');
  const picturesCopy = uploadedPhotos.slice();
  let uniqueRandomPictures = [];
  const randomPictures = picturesCopy.map(()=> getRandomArrayElement(picturesCopy));

  if (uniqueRandomPictures < MAX_RANDOM_PHOTOS ) {
    uniqueRandomPictures = new Set(randomPictures);
  }

  const picturesShown = Array.from(uniqueRandomPictures).slice(0, MAX_RANDOM_PHOTOS);
  createGalleryElement(picturesShown);
  const thumbnailsRandom = document.querySelectorAll('.picture');
  openPreview(thumbnailsRandom, picturesShown);
};

const addFilters = () => {
  defaultButton.addEventListener('click', debounce(createDefaultGallery, RERENDERED_DELAY,
  ));
  popularButton.addEventListener('click', debounce(createPopularGallery, RERENDERED_DELAY
  ));
  randomButton.addEventListener('click', debounce(createRandomGallery, RERENDERED_DELAY
  ));
};

addFilters();

export {createGallery, createGalleryElement};
