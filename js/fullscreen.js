import {PHOTOS} from './data.js';
import {makeElement, isEscapeKey, appendElement} from './util.js';

const FULLSCREEN_CONTAINER = document.querySelector('.big-picture');
const FULLSCREEN_PHOTO = FULLSCREEN_CONTAINER.querySelector('.big-picture__img img');
const THUMBNAILS = document.querySelectorAll('.picture');
const LIKES_NUMBER = FULLSCREEN_CONTAINER.querySelector('.likes-count');
const COMMENTS_NUMBER = FULLSCREEN_CONTAINER.querySelector('.comments-count');
const DESCRIPTION = FULLSCREEN_CONTAINER.querySelector('.social__caption');
const COMMENT_LIST = FULLSCREEN_CONTAINER.querySelector('.social__comments');
const COMMENT_LIST_COUNTER = FULLSCREEN_CONTAINER.querySelector('.social__comment-count');
const COMMENT_LOAD = FULLSCREEN_CONTAINER.querySelector('.comments-loader');
const PAGE_BODY = document.querySelector('body');
const FULLSCREEN_CLOSE_BUTTON = FULLSCREEN_CONTAINER.querySelector('.big-picture__cancel');

const closePhotoPreview = () => {
  FULLSCREEN_CONTAINER.classList.add('hidden');
  PAGE_BODY.classList.remove('modal-open');
};

const onPreviewEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoPreview();
    document.removeEventListener('keydown', onPreviewEscapeKeydown);
  }
};

const openPhotoPreview = () => {
  FULLSCREEN_CONTAINER.classList.remove('hidden');
  PAGE_BODY.classList.add('modal-open');
  document.addEventListener('keydown', onPreviewEscapeKeydown);
};




const addThumbnailClickHandler =  (thumbnail, photo) => {
  thumbnail.addEventListener ('click', () => {
    openPhotoPreview();
    FULLSCREEN_PHOTO.src = photo.url;
    LIKES_NUMBER.textContent = photo.likes;
    COMMENTS_NUMBER.textContent = photo.comments.length;
    COMMENT_LIST.innerHTML = '';

    photo.comments.forEach((comment) => {
      const COMMENT_LIST_ITEM = makeElement('li', 'social__comment');
      appendElement(COMMENT_LIST, COMMENT_LIST_ITEM);
      const COMMENT_AVATAR = makeElement('img', 'social__picture');
      COMMENT_AVATAR.style.width = '35px';
      COMMENT_AVATAR.style.heigh = '35px';
      appendElement(COMMENT_LIST_ITEM, COMMENT_AVATAR);
      COMMENT_AVATAR.src = comment.avatar;
      COMMENT_AVATAR.alt = comment.message;
      const COMMENT_CONTENT = makeElement('p', 'social__text', comment.message );
      appendElement(COMMENT_LIST_ITEM, COMMENT_CONTENT);

    });
    DESCRIPTION.textContent = photo.description;
    COMMENT_LOAD.classList.add('hidden');
    COMMENT_LIST_COUNTER.classList.add('hidden');
    FULLSCREEN_CLOSE_BUTTON.addEventListener(('click'), () => {
      closePhotoPreview ();
      document.removeEventListener('keydown', onPreviewEscapeKeydown);
    });
  });
};

for (let i = 0; i < THUMBNAILS.length; i++) {
  addThumbnailClickHandler(THUMBNAILS[i], PHOTOS[i]);
}

export {PAGE_BODY};


