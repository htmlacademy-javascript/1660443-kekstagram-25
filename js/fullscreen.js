import {PHOTOS} from './data.js';
import {makeElement, isEscapeKey} from './util.js';

const fullscreenContainer = document.querySelector('.big-picture');
const fullscreenPhoto = fullscreenContainer.querySelector('.big-picture__img img');
const thumbnails = document.querySelectorAll('.picture');
const likesNumber = fullscreenContainer.querySelector('.likes-count');
const commentsNumber = fullscreenContainer.querySelector('.comments-count');
const description = fullscreenContainer.querySelector('.social__caption');
const commentsContainer= fullscreenContainer.querySelector('.social__comments');
const commentsCounter = fullscreenContainer.querySelector('.social__comment-count');
const pageBody = document.querySelector('body');
const fullscreenCloseButton = fullscreenContainer.querySelector('.big-picture__cancel');
const loadCommentsButton = fullscreenContainer.querySelector('.comments-loader');
const MAX_COMMENTS_NUMBER = 5;

const closePhotoPreview = () => {
  fullscreenContainer.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  loadCommentsButton.classList.remove('hidden');
};

const onPreviewEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoPreview();
  }
};

const openPhotoPreview = () => {
  fullscreenContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onPreviewEscapeKeydown);
};

const addThumbnailClickHandler =  (thumbnail, photo) => {
  thumbnail.addEventListener ('click', () => {
    openPhotoPreview();
    fullscreenPhoto .src = photo.url;
    likesNumber.textContent = photo.likes;
    commentsNumber.textContent = String(photo.comments.length);
    description.textContent = photo.description;
    commentsContainer.innerHTML = '';


    const addFragment  = (comments)  => {
      const fragment = document.createDocumentFragment();

      comments.forEach((element) => {
        const commentsItem = makeElement('li', 'social__comment');
        commentsContainer.appendChild(commentsItem);
        const commentsAvatar = makeElement('img', 'social__picture');
        commentsAvatar.style.width = '35px';
        commentsAvatar.style.height = '35px';
        commentsItem.appendChild(commentsAvatar);
        commentsAvatar.src = element.avatar;
        commentsAvatar.alt = element.name;
        const COMMENT_CONTENT = makeElement('p', 'social__text', element.message );
        commentsItem.appendChild(COMMENT_CONTENT);
        fragment.appendChild(commentsItem);
      });
      return fragment;
    };

    const addComments = (array, container ) => {

      const commentsList = array.slice();
      const commentsPortion = commentsList.splice(0, MAX_COMMENTS_NUMBER);
      let commentsLength = commentsPortion.length;
      container.appendChild(addFragment(commentsPortion));
      commentsCounter.textContent = `${commentsLength} из ${array.length}`;

      if (commentsLength === array.length) {
        loadCommentsButton.classList.add ('hidden');
      }

      loadCommentsButton.addEventListener ('click', (evt) => {
        loadCommentsButton.classList.remove('hidden');
        evt.preventDefault();
        const additionalCommentsPortion = commentsList.splice(0, MAX_COMMENTS_NUMBER);
        const addedComments = additionalCommentsPortion.length;
        commentsContainer.appendChild(addFragment(additionalCommentsPortion ));
        commentsLength = commentsLength + addedComments;
        commentsCounter.textContent = `${commentsLength} из ${array.length}`;

        if (commentsList.length === 0) {
          loadCommentsButton.classList.add ('hidden');
        }
      });
    };
    addComments(photo.comments, commentsContainer);
  });};

fullscreenCloseButton.addEventListener ('click', () => {
  closePhotoPreview ();
  document.removeEventListener('keydown', onPreviewEscapeKeydown);
});

for (let i = 0; i < thumbnails.length; i++) {
  addThumbnailClickHandler(thumbnails[i], PHOTOS[i]);
}

export {pageBody};


