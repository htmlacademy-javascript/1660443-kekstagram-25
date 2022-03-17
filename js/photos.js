import {PHOTO_DESCRIPTION} from './data.js';

const PHOTOS_CONTAINER = document.querySelector ('.pictures');
const PHOTOS_TEMPLATE_FRAGMENT = document.querySelector('#picture').content;
const PHOTOS_TEMPLATE = PHOTOS_TEMPLATE_FRAGMENT.querySelector('.picture');
const LIKES_NUMBER = PHOTOS_TEMPLATE_FRAGMENT.querySelector('.picture__likes');
const COMMENTS_NUMBER = PHOTOS_TEMPLATE_FRAGMENT.querySelector('.picture__comments');
const PHOTOS_IMAGES = PHOTOS_TEMPLATE_FRAGMENT.querySelector('.picture__img');

PHOTO_DESCRIPTION.forEach ((photos) => {
  PHOTOS_IMAGES.src = photos.url;
  LIKES_NUMBER.textContent = photos.likes;
  COMMENTS_NUMBER.textContent = photos.comments.length;
  const PHOTOS_ELEMENT = PHOTOS_TEMPLATE.cloneNode(true);
  PHOTOS_CONTAINER.appendChild(PHOTOS_ELEMENT);
});
