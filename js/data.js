import {addThumbnailClickHandler} from './fullscreen.js';
<<<<<<< HEAD
import {popularButton, randomButton, defaultButton,removeClass, removeElement} from './filter.js';
=======
import {defaultButton, popularButton, randomButton, removeClass, removeElement} from './filter.js';
>>>>>>> 5e0b874 (Перламутровые пуговицы)
import {getRandomArrayElement} from './util.js';
const galleryFragment = document.createDocumentFragment();
const photoContainer = document.querySelector ('.pictures');
const photoTemplateFragment = document.querySelector('#picture').content;
const photoTemplate = photoTemplateFragment.querySelector('.picture');
const MAX_RANDOM_PHOTOS = 10;
let picturesShown = [];

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const createGalleryElement = (pictures) => {
  pictures.forEach((photo) => {
    const pictureElement =  photoTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__img').src = photo.url;
    galleryFragment.appendChild(pictureElement);
    photoContainer.appendChild(galleryFragment);
  });};


<<<<<<< HEAD
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
=======
  for (let i = 0; i < thumbnails.length; i++) {
    addThumbnailClickHandler(thumbnails[i], pictures[i]);
  }

>>>>>>> 5e0b874 (Перламутровые пуговицы)
  defaultButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeElement();
    removeClass();
    defaultButton.classList.add('img-filters__button--active');
<<<<<<< HEAD
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
=======
    //так работает полноэкранный режим
    //createGalleryElement(pictures),

    // а так debounce
    const createDefaultGallery = debounce(() => createGalleryElement(pictures), 500);

    createDefaultGallery(pictures);
    const  thumbnailsDefault = document.querySelectorAll('.picture');
    for (let i = 0; i < thumbnailsDefault.length; i++) {
      addThumbnailClickHandler(thumbnailsDefault[i], pictures[i]);
    }});

  popularButton.addEventListener('click', (evt) => {
>>>>>>> 5e0b874 (Перламутровые пуговицы)
    evt.preventDefault();
    removeElement();
    removeClass();
    popularButton.classList.add('img-filters__button--active');
    const picturesCopy = pictures.slice();
    const picturesSorted = picturesCopy.sort((a , b) => b.comments.length - a.comments.length);
<<<<<<< HEAD
    //createGalleryElement(picturesSorted);



    //cb(picturesSorted);
=======

    //так работает полноэкранный режим
    //createGalleryElement(picturesSorted),
    // а так debounce
    const createPopularGallery = debounce(() => createGalleryElement(picturesSorted), 500);

    createPopularGallery();
>>>>>>> 5e0b874 (Перламутровые пуговицы)
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
<<<<<<< HEAD
    //createGalleryElement(picturesShown);
    cb(picturesShown);
=======
    //так работает полноэкранный режим
    //createGalleryElement(picturesShown),

    // а так debounce
    const createRandomGallery = debounce(() => createGalleryElement(picturesShown), 500);

    createRandomGallery();
>>>>>>> 5e0b874 (Перламутровые пуговицы)
    const thumbnailsRandom = document.querySelectorAll('.picture');

    for (let i = 0; i < thumbnailsRandom.length; i++) {
      addThumbnailClickHandler(thumbnailsRandom[i], picturesShown[i]);
    }
  });};

<<<<<<< HEAD
*/
export { createGalleryElement, createDefaultGallery, picturesShown, removeElement, removeClass};
=======
export {createGallery, createGalleryElement, removeElement, removeClass};
>>>>>>> 5e0b874 (Перламутровые пуговицы)


