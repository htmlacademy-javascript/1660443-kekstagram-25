import {addThumbnailClickHandler} from './fullscreen.js';
import {popularButton, randomButton, removeClass, removeElement} from './filter.js';
import {getRandomArrayElement} from './util.js';

const galleryFragment = document.createDocumentFragment();
const photoContainer = document.querySelector ('.pictures');
const photoTemplateFragment = document.querySelector('#picture').content;
const photoTemplate = photoTemplateFragment.querySelector('.picture');
const MAX_RANDOM_PHOTOS = 10;

const createGalleryElement = (pictures) => {
  pictures.forEach((photo) => {
    const pictureElement =  photoTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__img').src = photo.url;
    galleryFragment.appendChild(pictureElement);
    photoContainer.appendChild(galleryFragment);
  });};

const createGallery = (pictures) => {
  createGalleryElement(pictures);
  const thumbnails = document.querySelectorAll('.picture');

  popularButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeElement();
    removeClass();
    popularButton.classList.add('img-filters__button--active');
    const picturesCopy = pictures.slice();
    const picturesSorted = picturesCopy.sort((a , b) => b.comments.length - a.comments.length);
    createGalleryElement(picturesSorted);
    const thumbnailsSorted = document.querySelectorAll('.picture');

    for (let i = 0; i < thumbnailsSorted.length; i++) {
      addThumbnailClickHandler(thumbnailsSorted[i], picturesSorted[i]);
    }
  });

  randomButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeElement();
    removeClass();
    randomButton.classList.add('img-filters__button--active');
    const picturesCopy = pictures.slice();

    const randomPictures = [];
    let uniqueRandomPictures = [];

    if (uniqueRandomPictures < MAX_RANDOM_PHOTOS ) {
      picturesCopy.forEach (() => {
        const randomElement = getRandomArrayElement(picturesCopy);
        randomPictures.push(randomElement);
        uniqueRandomPictures = new Set(randomPictures);
      });
    }
    const picturesShown = Array.from(uniqueRandomPictures).slice(0, MAX_RANDOM_PHOTOS);
    createGalleryElement(picturesShown);
    const thumbnailsRandom = document.querySelectorAll('.picture');

    for (let i = 0; i < thumbnailsRandom.length; i++) {
      addThumbnailClickHandler(thumbnailsRandom[i], picturesShown[i]);
    }
  });

  for (let i = 0; i < thumbnails.length; i++) {
    addThumbnailClickHandler(thumbnails[i], pictures[i]);
  }};

export {createGallery, removeElement, removeClass};


