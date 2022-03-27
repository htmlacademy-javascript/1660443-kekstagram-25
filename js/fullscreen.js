import {PHOTOS} from './data.js';
import {makeElement, isEscapeKey} from './util.js';

const FULLSCREEN_CONTAINER = document.querySelector('.big-picture');
const FULLSCREEN_PHOTO = FULLSCREEN_CONTAINER.querySelector('.big-picture__img img');
const THUMBNAILS = document.querySelectorAll('.picture');
const LIKES_NUMBER = FULLSCREEN_CONTAINER.querySelector('.likes-count');
const COMMENTS_NUMBER = FULLSCREEN_CONTAINER.querySelector('.comments-count');
const DESCRIPTION = FULLSCREEN_CONTAINER.querySelector('.social__caption');
const COMMENT_LIST = FULLSCREEN_CONTAINER.querySelector('.social__comments');
const COMMENT_LIST_COUNTER = FULLSCREEN_CONTAINER.querySelector('.social__comment-count');
const PAGE_BODY = document.querySelector('body');
const FULLSCREEN_CLOSE_BUTTON = FULLSCREEN_CONTAINER.querySelector('.big-picture__cancel');
const LOAD_BUTTON = FULLSCREEN_CONTAINER.querySelector('.comments-loader');
const MAX_COMMENTS_NUMBER = 5;

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

const removeEventListener = () => {
  closePhotoPreview();
  document.removeEventListener('keydown', onPreviewEscapeKeydown);
};

const addThumbnailClickHandler =  (thumbnail, photo) => {
  thumbnail.addEventListener ('click', () => {
    openPhotoPreview();
    FULLSCREEN_PHOTO.src = photo.url;
    LIKES_NUMBER.textContent = photo.likes;
    COMMENTS_NUMBER.textContent = String(photo.comments.length);
    DESCRIPTION.textContent = photo.description;
    COMMENT_LIST.innerHTML = '';


<<<<<<< HEAD
    });
    DESCRIPTION.textContent = photo.description;
    COMMENT_LOAD.classList.add('hidden');
    COMMENT_LIST_COUNTER.classList.add('hidden');
    FULLSCREEN_CLOSE_BUTTON.addEventListener(('click'), () => {
<<<<<<< HEAD
      FULLSCREEN_CONTAINER.classList.add('hidden');
      PAGE_BODY.classList.remove('modal-open');
    });
    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        FULLSCREEN_CONTAINER.classList.add('hidden');
        PAGE_BODY.classList.remove('modal-open');
      }
=======
      removeEventListener();
>>>>>>> 6ea165d (Правда или действие(часть 1))
    });
  });
};
=======
    const addFragment  = (comments)  => {
      const fragment = document.createDocumentFragment();

      comments.forEach((element) => {
        const COMMENT_LIST_ITEM = makeElement('li', 'social__comment');
        COMMENT_LIST.appendChild(COMMENT_LIST_ITEM);
        const COMMENT_AVATAR = makeElement('img', 'social__picture');
        COMMENT_AVATAR.style.width = '35px';
        COMMENT_AVATAR.style.height = '35px';
        COMMENT_LIST_ITEM.appendChild(COMMENT_AVATAR);
        COMMENT_AVATAR.src = element.avatar;
        COMMENT_AVATAR.alt = element.name;
        const COMMENT_CONTENT = makeElement('p', 'social__text', element.message );
        COMMENT_LIST_ITEM.appendChild(COMMENT_CONTENT);
        fragment.appendChild(COMMENT_LIST_ITEM);
      });
      return fragment;
    };

    const addComments = (array, container ) => {

      const commentsList = array.slice();
      const commentsPortion = commentsList.splice(0, MAX_COMMENTS_NUMBER);
      let commentsLength = commentsPortion.length;
      container.appendChild(addFragment(commentsPortion));
      COMMENT_LIST_COUNTER.textContent = `${commentsLength} из ${array.length}`;
      if (commentsLength === array.length) {
        LOAD_BUTTON.classList.add ('hidden');
      }


      LOAD_BUTTON.addEventListener ('click', () => {
        const additionalCommentsPortion = commentsList.splice(0, MAX_COMMENTS_NUMBER);
        const addedComments = additionalCommentsPortion.length;
        COMMENT_LIST.appendChild(addFragment(additionalCommentsPortion ));
        commentsLength = commentsLength + addedComments;
        COMMENT_LIST_COUNTER.textContent = `${commentsLength} из ${array.length}`;
        if (commentsList.length === 0) {
          LOAD_BUTTON.classList.add ('hidden');
        }
      });

    };
    addComments(photo.comments, COMMENT_LIST);
  });};

FULLSCREEN_CLOSE_BUTTON.addEventListener ('click', () => {
  closePhotoPreview ();
  document.removeEventListener('keydown', onPreviewEscapeKeydown);
});
>>>>>>> b5d7152 (Правда или действие (часть 2))

for (let i = 0; i < THUMBNAILS.length; i++) {
  addThumbnailClickHandler(THUMBNAILS[i], PHOTOS[i]);
}


