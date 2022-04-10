import {isEscapeKey, makeElement} from './util.js';

const MAX_COMMENTS_NUMBER = 5;
const previewContainerElement = document.querySelector('.big-picture');
const pageBodyElement = document.querySelector('body');
const previewPhotoElement = previewContainerElement.querySelector('.big-picture__img img');
const likesNumberElement = previewContainerElement.querySelector('.likes-count');
const commentsNumberElement = previewContainerElement.querySelector('.comments-count');
const commentsDescriptionElement = previewContainerElement.querySelector('.social__caption');
const commentsContainerElement= previewContainerElement.querySelector('.social__comments');
const commentsCounterElement = previewContainerElement.querySelector('.social__comment-count');
const previewCloseButtonElement = previewContainerElement.querySelector('.big-picture__cancel');
const loadCommentsButtonElement = previewContainerElement.querySelector('.comments-loader');

const closePhotoPreview = () => {
  previewContainerElement.classList.add('hidden');
  pageBodyElement.classList.remove('modal-open');
  loadCommentsButtonElement.classList.remove('hidden');
};

const onPreviewEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoPreview();
  }
};

const openPhotoPreview = () => {
  previewContainerElement.classList.remove('hidden');
  pageBodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPreviewEscapeKeydown);
};

const onThumbnailClick =  ((thumbnails, photo) => {

  thumbnails.addEventListener ('click', () => {
    openPhotoPreview();
    previewPhotoElement.src = photo.url;
    likesNumberElement.textContent = photo.likes;
    commentsNumberElement.textContent = String(photo.comments.length);
    commentsDescriptionElement.textContent = photo.description;
    commentsContainerElement.innerHTML = '';

    const addCommentsFragment  = (comments)  => {
      const commentsFragment = document.createDocumentFragment();

      comments.forEach((element) => {
        const commentsElement = makeElement('li', 'social__comment');
        commentsContainerElement.appendChild(commentsElement);
        const commentsAvatarElement = makeElement('img', 'social__picture');
        commentsAvatarElement.style.width = '35px';
        commentsAvatarElement.style.height = '35px';
        commentsElement.appendChild(commentsAvatarElement);
        commentsAvatarElement.src = element.avatar;
        commentsAvatarElement.alt = element.name;
        const commentsContentElement = makeElement('p', 'social__text', element.message );
        commentsElement.appendChild(commentsContentElement);
        commentsFragment.appendChild(commentsElement);
      });
      return commentsFragment;
    };

    const addComments = (array, container ) => {

      const commentsList = array.slice();
      const commentsPortion = commentsList.splice(0, MAX_COMMENTS_NUMBER);
      let commentsLength = commentsPortion.length;
      container.appendChild(addCommentsFragment(commentsPortion));
      commentsCounterElement.textContent = `${commentsLength} из ${array.length}`;

      if (commentsLength === array.length) {
        loadCommentsButtonElement.classList.add ('hidden');
      }

      loadCommentsButtonElement.addEventListener ('click', (evt) => {
        loadCommentsButtonElement.classList.remove('hidden');
        evt.preventDefault();
        const additionalCommentsPortion = commentsList.splice(0, MAX_COMMENTS_NUMBER);
        const additionalCommentsLength = additionalCommentsPortion.length;
        commentsContainerElement.appendChild(addCommentsFragment(additionalCommentsPortion ));
        commentsLength = commentsLength + additionalCommentsLength;
        commentsCounterElement.textContent = `${commentsLength} из ${array.length}`;

        if (commentsList.length === 0) {
          loadCommentsButtonElement.classList.add ('hidden');
        }
      });
    };
    addComments(photo.comments, commentsContainerElement);
  });});

previewCloseButtonElement.addEventListener ('click', () => {
  closePhotoPreview ();
  document.removeEventListener('keydown', onPreviewEscapeKeydown);
});

export {onThumbnailClick, pageBodyElement};


