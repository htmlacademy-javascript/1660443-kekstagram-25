import {addThumbnailClickHandler} from './fullscreen.js';
import {popularButton, randomButton, defaultButton,removeClass, removeElement} from './filter.js';
import {getRandomArrayElement} from './util.js';
const galleryFragment = document.createDocumentFragment();
const photoContainer = document.querySelector ('.pictures');
const photoTemplateFragment = document.querySelector('#picture').content;
const photoTemplate = photoTemplateFragment.querySelector('.picture');
const MAX_RANDOM_PHOTOS = 10;
let picturesShown = [];

const createGalleryElement = (pictures) => {
  pictures.forEach((photo) => {
    const pictureElement =  photoTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__img').src = photo.url;
    galleryFragment.appendChild(pictureElement);
    photoContainer.appendChild(galleryFragment);
  });};


 /* const showDefaultPictures = (pictures, cb) => {
    defaultButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      removeElement();
      removeClass();
      defaultButton.classList.add('img-filters__button--active');
      //createGalleryElement(picture)
      //cb(pictures);
    })}


     // for (let i = 0; i < thumbnails.length; i++) {
      //  addThumbnailClickHandler(thumbnails[i], pictures[i]);
    //  }
   // })}

const showRandomPictures = (pictures, cb) => {
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
    picturesShown = Array.from(uniqueRandomPictures).slice(0, MAX_RANDOM_PHOTOS);
    cb(picturesShown);
    const thumbnailsRandom = document.querySelectorAll('.picture');

    for (let i = 0; i < thumbnailsRandom.length; i++) {
      addThumbnailClickHandler(thumbnailsRandom[i], picturesShown[i]);
    }
  });}*/







  //createGalleryElement(pictures); {
  //const thumbnails = document.querySelectorAll('.picture');
  //for (let i = 0; i < thumbnails.length; i++) {
    //addThumbnailClickHandler(thumbnails[i], pictures[i]);
  //}}


  const createDefaultGallery = (pictures, cb) => {
  defaultButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeElement();
    removeClass();
    defaultButton.classList.add('img-filters__button--active');
    createGalleryElement(pictures);
    //cb();
    const thumbnailsDefault = document.querySelectorAll('.picture');
    console.log(thumbnailsDefault)
    for (let i = 0; i < thumbnails.length; i++) {
      addThumbnailClickHandler(thumbnailsDefault[i], pictures[i]);
  }})};


//createDefaultGallery(()=>createGalleryElement(pictures))




  //createDefaultGallery(debounce (()=>createGalleryElement(pictures),
  //RERENDER_DELAY))


  /*popularButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeElement();
    removeClass();
    popularButton.classList.add('img-filters__button--active');
    const picturesCopy = pictures.slice();
    const picturesSorted = picturesCopy.sort((a , b) => b.comments.length - a.comments.length);
    //createGalleryElement(picturesSorted);



    //cb(picturesSorted);
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
    //createGalleryElement(picturesShown);
    cb(picturesShown);
    const thumbnailsRandom = document.querySelectorAll('.picture');

    for (let i = 0; i < thumbnailsRandom.length; i++) {
      addThumbnailClickHandler(thumbnailsRandom[i], picturesShown[i]);
    }
  });

*/
export { createGalleryElement, createDefaultGallery, picturesShown, removeElement, removeClass};


