import {isEscapeKey, makeElement} from './util.js';

const MAX_COMMENTS_NUMBER = 5;
const previewContainer = document.querySelector('.big-picture');
const pageBody = document.querySelector('body');
const previewPhoto = previewContainer.querySelector('.big-picture__img img');
const likesNumber = previewContainer.querySelector('.likes-count');
const commentsNumber = previewContainer.querySelector('.comments-count');
const commentsDescription = previewContainer.querySelector('.social__caption');
const commentsContainerElement= previewContainer.querySelector('.social__comments');
const commentsCounter = previewContainer.querySelector('.social__comment-count');
const previewCloseButton = previewContainer.querySelector('.big-picture__cancel');
const loadCommentsButton = previewContainer.querySelector('.comments-loader');

const closePhotoPreview = () => {
  previewContainer.classList.add('hidden');
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
  previewContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onPreviewEscapeKeydown);
};

const onThumbnailClick =  ((thumbnails, photo) => {

  thumbnails.addEventListener ('click', () => {
    openPhotoPreview();
    previewPhoto.src = photo.url;
    likesNumber.textContent = photo.likes;
    commentsNumber.textContent = String(photo.comments.length);
    commentsDescription.textContent = photo.description;
    commentsContainerElement.innerHTML = '';

    const addCommentsFragment  = (comments)  => {
      const commentsFragment = document.createDocumentFragment();

      comments.forEach((element) => {
        const commentsElement = makeElement('li', 'social__comment');
        commentsContainerElement.appendChild(commentsElement);
        const commentsAvatar = makeElement('img', 'social__picture');
        commentsAvatar.style.width = '35px';
        commentsAvatar.style.height = '35px';
        commentsElement.appendChild(commentsAvatar);
        commentsAvatar.src = element.avatar;
        commentsAvatar.alt = element.name;
        const commentsContent = makeElement('p', 'social__text', element.message );
        commentsElement.appendChild(commentsContent);
        commentsFragment.appendChild(commentsElement);
      });
      return commentsFragment;
    };

    const addComments = (array, container ) => {

      const commentsList = array.slice();
      const commentsPortion = commentsList.splice(0, MAX_COMMENTS_NUMBER);
      let commentsLength = commentsPortion.length;
      container.appendChild(addCommentsFragment(commentsPortion));
      commentsCounter.textContent = `${commentsLength} из ${array.length}`;

      if (commentsLength === array.length) {
        loadCommentsButton.classList.add ('hidden');
      }

      loadCommentsButton.addEventListener ('click', (evt) => {
        loadCommentsButton.classList.remove('hidden');
        evt.preventDefault();
        const additionalCommentsPortion = commentsList.splice(0, MAX_COMMENTS_NUMBER);
        const additionalCommentsLength = additionalCommentsPortion.length;
        commentsContainerElement.appendChild(addCommentsFragment(additionalCommentsPortion ));
        commentsLength = commentsLength + additionalCommentsLength;
        commentsCounter.textContent = `${commentsLength} из ${array.length}`;

        if (commentsList.length === 0) {
          loadCommentsButton.classList.add ('hidden');
        }
      });
    };
    addComments(photo.comments, commentsContainerElement);
  });});

previewCloseButton.addEventListener ('click', () => {
  closePhotoPreview ();
  document.removeEventListener('keydown', onPreviewEscapeKeydown);
});

export {onThumbnailClick, pageBody};


