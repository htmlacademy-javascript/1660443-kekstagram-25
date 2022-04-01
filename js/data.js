import {addThumbnailClickHandler} from './fullscreen.js';

const photos = [];

const createGallery = (pictures) => {

  const photoContainer = document.querySelector ('.pictures');
  const photoTemplateFragment = document.querySelector('#picture').content;
  const photoTemplate = photoTemplateFragment.querySelector('.picture');


  pictures.forEach((photo) => {
    photos.push(photo);
    const pictureElement =  photoTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__img').src = photo.url;
    photoContainer.appendChild(pictureElement);

  });

  const thumbnails = document.querySelectorAll('.picture');
  for (let i = 0; i < thumbnails.length; i++) {
    addThumbnailClickHandler(thumbnails[i], photos[i]);
  }
};
export {createGallery, photos};
